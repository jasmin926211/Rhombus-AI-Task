from . import views
from django.urls import path

urlpatterns = [
    path('hello-world/', views.hello_world, name='hello_world'),

    # URL pattern for the 'process_data' view
    path('process-data/', views.process_data, name='process_data'),
]
