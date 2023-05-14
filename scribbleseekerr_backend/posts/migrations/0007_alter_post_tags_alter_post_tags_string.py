# Generated by Django 4.2.1 on 2023-05-14 16:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0006_alter_post_tags'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='tags',
            field=models.ManyToManyField(blank=True, null=True, to='posts.tag'),
        ),
        migrations.AlterField(
            model_name='post',
            name='tags_string',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]