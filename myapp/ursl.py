from django.urls import path, include
from . import views
from django.contrib.auth.forms import UserCreationForm


form = UserCreationForm
urlpatterns = [
    path('',views.index,name='index'),
    path('carrito/',views.carrito,name='carrito'),
    
]