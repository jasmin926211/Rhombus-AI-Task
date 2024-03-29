from . import views
from django.urls import path

urlpatterns = [
    path('hello-world/', views.hello_world, name='hello_world'),

    # URL pattern for the 'process_data' view
    path('process-data/', views.process_data, name='process_data'),
    path('fetch-data/', views.fetch_data, name='fetch_data'),
    path('update-data-types/', views.update_data_types, name='update_data_types'),
]
