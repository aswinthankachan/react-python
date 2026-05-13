from django.db import models

# Create your models hefrom django.db import models


class Customer(models.Model):

    customer_name = models.CharField(max_length=100)
    city = models.CharField(max_length=100)


class Product(models.Model):

    product_name = models.CharField(max_length=100)
    price = models.IntegerField()


class Entry(models.Model):

    customer = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )
