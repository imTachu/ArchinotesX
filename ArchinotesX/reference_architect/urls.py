from django.conf.urls import url, include

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^datasources/$', views.overview, name='datasources'),
    url('^', include('django.contrib.auth.urls')),
]
