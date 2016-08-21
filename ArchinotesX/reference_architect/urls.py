from django.conf.urls import url, include

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^datasources/$', views.datasources, name='datasources'),
    url(r'^microservices/$', views.microservices, name='microservices'),
    url('^', include('django.contrib.auth.urls')),
]
