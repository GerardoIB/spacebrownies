from django.db.models.signals import post_migrate
from django.dispatch import receiver
from .models import Brownies

@receiver(post_migrate)
def create_default_brownie(sender, **kwargs):
    if sender.name == 'myapp':
        Brownies.objects.get_or_create(
            name='Tradicional',
            defaults={'price': 30.00}
        )
        Brownies.objects.get_or_create(
            name='Relleno',
            defaults={'price': 40.00}
        )
        Brownies.objects.get_or_create(
            name='Persolalizado',
            defaults={'price': 45.00}
        )
