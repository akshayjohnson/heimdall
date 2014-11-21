from django.conf.urls import patterns, url

urlpatterns = patterns('story.views',
    url(r'^$', 'index')
)
