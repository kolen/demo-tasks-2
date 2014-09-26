angular.module('tasks', ['ui.sortable', 'RecursionHelper'])
.controller('Tasks', ['$scope', function($scope) {
    $scope.tasks = [
      {
        id: 3,
        parent: null,
        text: 'Lol',
        children: []
      },
      {
        id: 5,
        parent: null,
        text: 'Foo',
        children: []
      }
    ];

    var storeOrder = function(tasks) {
      var taskIdsOrdered = tasks.map(function(task) {return task.id});
      console.log("TODO: call POST reorder ", taskIdsOrdered);
    };

    $scope.changeListeners = {
      textChanged: function(task) {
        console.log("Test", task);
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
          console.log("Changing parent to ", parentId);
          console.log("TODO: call PUT");
          storeOrder(event.dest.sortableScope.tasks);
        }
      },
      delete: function(task) {
        task.deleted = true;
        console.log("TODO: call DELETE ", task.id);
      }
    };
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
            '<a href="#" data-ng-click="listeners.delete(task)">delete</a>' +
            '<input data-ng-model="task.text" data-ng-change="listeners.textChanged(task)" />' +
            '<tasklist tasks="task.children" listeners="listeners" task-id="task.id" />' +
          '</li>' +
        '</ul>',
      compile: function(element) {
        return RecursionHelper.compile(element);
      }
    };
}]);