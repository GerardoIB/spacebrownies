from django.forms import forms
from .models import Product, Category

class productForm(forms.ModelForm):
    name = forms.CharField(label="Nombre del producto",widget = forms.TextInpout(attrs={
        'class' : "form-control",
        'id' : "product_name"
    }))