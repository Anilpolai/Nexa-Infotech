from django.db import models

# Create your models here.

# class blog(models.Model):
#     title = models.CharField(max_length=200)
#     descriptions = models.TextField()

#     def __str__(self):
#         return self.title

# class blogimage(models.Model):
#     post = models.ForeignKey(blog, on_delete=models.CASCADE, related_name='images')
#     image = models.ImageField(upload_to='blogimages/')

#     def __str__(self):
#         return f"Image for {self.post.title}"


class nexaadmin(models.Model):

    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True, null=True)
    password = models.CharField(max_length=128)
    image = models.ImageField(upload_to="admin_profiles/", blank=True, null=True)

    def __str__(self):
        return self.username


class post(models.Model):
    title = models.CharField(max_length=200)
    descriptions = models.TextField()


class postimage(models.Model):
    blog = models.ForeignKey(post, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="blog_images/")


class Team(models.Model):
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to="team_images/")

    def __str__(self):
        return f"{self.name} - {self.position}"


class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()

    def __str__(self):
        return f"{self.name} - {self.subject}"



class Portfolio(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=100)
    video = models.FileField(upload_to="portfolio_videos/")  # Accepts video files

    def __str__(self):
        return self.title