angular.module('tasks', ['ui.sortable', 'RecursionHelper', 'ngResource'])
.controller('Tasks', ['$scope', '$http', 'treeify', function($scope, $http, treeify) {
    $scope.tasks = [];

    var reloadAll = function() {
      $http({method: 'GET', url: window.api_urls.tasks})
      .success(function(data) {
        $scope.tasks = treeify(data);
      });
    };
    reloadAll();

    var save = function(task) {
      return $http({method: 'PUT', url: window.api_urls.task + task.id, data: task})
    };

    var storeOrder = function(tasks) {
      var taskIdsOrdered = tasks.map(function(task) {return task.id});
      return $http({method: 'POST', url: window.api_urls.reorder, data: taskIdsOrdered});
    };

    $scope.changeListeners = {
      textChanged: function(task) {
        save(task);
      },
      reorder: {
        orderChanged: function(event) {
          storeOrder(event.dest.sortableScope.tasks);
        },
        itemMoved: function(event) {
          var parentId = event.dest.sortableScope.$parent.taskId;
          if (parentId === undefined) {
            parentId = null;
          }
          event.source.itemScope.task.parent = parentId;
          save(event.source.itemScope.task).then(function() {
            storeOrder(event.dest.sortableScope.tasks);
          });
        }
      },
      delete: function(task) {
        task.deleted = true;
        console.log("TODO: call DELETE ", task.id);
      }
    };

    $scope.addNewTask = function() {
      $http({method: 'POST', url: window.api_urls.tasks, data: {description: '', parent: null}})
      .success(function() {
        reloadAll();
      });
    }
}])
.directive('tasklist', ['RecursionHelper', function(RecursionHelper) {
    return {
      restrict: 'E',
      scope: {
        tasks: '=',
        listeners: '=',
        taskId: '='
      },
      template: '' +
        '<ul data-sortable="listeners.reorder" ng-model="tasks">' +
          '<li data-sortable-item data-ng-repeat="task in tasks" data-ng-if="!task.deleted">' +
            '<div data-sortable-item-handle style="width: 15px; height: 25px; background: #eee;"></div>' +
            '<span class="id">{{task.id}}</span>' +
            '<a href="#" data-ng-click="listeners.delete(task)" data-ng-if="task.children.length==0">delete</a>' +
            '<input data-ng-model="task.description" data-ng-change="listeners.textChanged(task)" />' +
            '<tasklist tasks="task.children" listeners="listeners" task-id="task.id" />' +
          '</li>' +
        '</ul>',
      compile: function(element) {
        return RecursionHelper.compile(element);
      }
    };
}])
.factory('treeify', function() {
  return function treeify(list, idAttr, parentAttr, childrenAttr) {
    if (!idAttr) idAttr = 'id';
    if (!parentAttr) parentAttr = 'parent';
    if (!childrenAttr) childrenAttr = 'children';

    var treeList = [];
    var lookup = {};
    list.forEach(function(obj) {
        lookup[obj[idAttr]] = obj;
        obj[childrenAttr] = [];
    });
    list.forEach(function(obj) {
        if (obj[parentAttr] != null) {
            lookup[obj[parentAttr]][childrenAttr].push(obj);
        } else {
            treeList.push(obj);
        }
    });
    return treeList;
  };
});