from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'test_tasks_2.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'tasks.views.home'),
    url(r'^api/task$', 'tasks.views.tasks', name='tasks'),
    url(r'^api/task/(?P<id>\d+)?$', 'tasks.views.task', name='task'),
    url(r'^api/task/reorder$', 'tasks.views.reorder', name='reorder')
) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
