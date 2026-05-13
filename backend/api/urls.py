from django.urls import path
from .views import *

urlpatterns = [

    path('customers/', customers),
    path('products/', products),
    path('save/', save),
    path('report/', report),

]