# Generated by Django 4.2.1 on 2023-05-20 14:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0009_remove_post_flames_post_flames'),
        ('users', '0003_alter_scribbleuser_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='scribbleuser',
            name='posts',
            field=models.ManyToManyField(to='posts.post'),
        ),
    ]