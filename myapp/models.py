from django.db import models

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=100)

class Category(models.Model):
    name = models.TextField()
    products = models.ForeignKey(Product, on_delete = models.CASCADE)

class User(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    
class Brownies(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    
    def __str__(self):
        return self.name
    

class example(models.Model):
     name = models.CharField(max_length=100)
     description = models.CharField(max_length=100)
    


     