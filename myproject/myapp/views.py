from django.shortcuts import render, redirect, get_object_or_404  # type: ignore
from django.contrib.auth import authenticate, login, logout  # type: ignore
from django.contrib.auth.decorators import login_required  # type: ignore
from django.contrib import messages  # type: ignore
from django.http import JsonResponse  # type: ignore
from django.views.decorators.csrf import csrf_exempt  # type: ignore
import json
from django.contrib.auth.hashers import make_password
from datetime import datetime, timedelta
from .models import post, postimage, nexaadmin, Team, Contact,Portfolio


# Client views
def index(request):
    portfolios = Portfolio.objects.all()
    return render(request, "client/index.html",{
        "portfolios": portfolios})


def index_2(request):
    return render(request, "client/index-2.html")


def about(request):
    return render(request, "client/about.html")


def services(request):
    return render(request, "client/services.html")


def portfolio(request):

    portfolios = Portfolio.objects.all().order_by("-id")
    
   
    return render(request, "client/portfolio.html", {"portfolios": portfolios,})



def faq(request):
    return render(request, "client/faq.html")


def team(request):
    teams = Team.objects.all()
    return render(request, "client/team.html", {"teams": teams})


def blog(request):
    blogs = post.objects.all().order_by("-id").prefetch_related("images")
    return render(request, "client/blog.html", {"blogs": blogs})


def contact(request):
    if request.method == "POST":
        name = request.POST.get("name")
        email = request.POST.get("email")
        subject = request.POST.get("subject")
        message = request.POST.get("message")

        # Save to database
        Contact.objects.create(name=name, email=email, subject=subject, message=message)
        return redirect("contact")

    return render(request, "client/contact.html")


def codemario(request):
    return render(request, "client/codemario.html")


def blog_single(request):  # ✅ fixed name
    return render(request, "client/blog_single.html")


# Admin views
def admin_login(request):
    if request.method == "POST":
        username_email = request.POST.get("username_email")
        password = request.POST.get("password")

        try:
            # Try fetching by username or email
            admin_user = (
                nexaadmin.objects.get(username=username_email)
                if nexaadmin.objects.filter(username=username_email).exists()
                else nexaadmin.objects.get(email=username_email)
            )

            if admin_user.password == password:
                request.session["admin_logged_in"] = True
                request.session["admin_username"] = admin_user.username
                messages.success(request, f"Welcome, {admin_user.username}!")
                return redirect("admin_dashboard")
            else:
                messages.error(request, "Invalid password")

        except nexaadmin.DoesNotExist:
            messages.error(request, "Invalid username or email")

        return render(request, "admin/index.html")  # Login page again with errors

    return render(request, "admin/index.html")


def admin_logout(request):
    if request.session.get("admin_logged_in") and request.session.get("admin_username"):
        request.session.flush()
        messages.success(request, "You have been logged out successfully.")
    else:
        messages.error(request, "You are not logged in.")
    return redirect("admin_login")


# @login_required(login_url='admin_login')
def admin_index(request):
    if not request.session.get("admin_logged_in"):
        messages.error(request, "Please login first.")
        return redirect("admin_login")
    return render(request, "admin/dashboard.html")

def admin_dashboard(request):
    if not request.session.get("admin_logged_in"):
        messages.error(request, "Please login first.")
        return redirect("admin_login")

    admin_user = None
    if "admin_username" in request.session:
        try:
            admin_user = nexaadmin.objects.get(username=request.session["admin_username"])
        except nexaadmin.DoesNotExist:
            admin_user = None
            messages.error(request, "Admin not found.")
            return redirect("admin_login")

    # Handle profile update
    if request.method == "POST":
        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password")
        image = request.FILES.get("image")

        if nexaadmin.objects.exclude(id=admin_user.id).filter(username=username).exists():
            messages.error(request, "Username already taken.")
            return redirect("admin_dashboard")

        if nexaadmin.objects.exclude(id=admin_user.id).filter(email=email).exists():
            messages.error(request, "Email already in use.")
            return redirect("admin_dashboard")

        admin_user.username = username
        admin_user.email = email

        if password:
            admin_user.password = make_password(password)

        if image:
            admin_user.image = image

        admin_user.save()
        request.session["admin_username"] = username  

        messages.success(request, "Profile updated successfully.")
        return redirect("admin_dashboard")

    return render(request, "admin/dashboard.html", {"admin_user": admin_user})
# @login_required(login_url='admin_login')
def admin_service(request):
    if not request.session.get("admin_logged_in"):
        messages.error(request, "Please login first.")
        return redirect("admin_login")
    admin_user = None
    if "admin_username" in request.session:
        try:
            admin_user = nexaadmin.objects.get(username=request.session["admin_username"])
        except nexaadmin.DoesNotExist:
            admin_user = None

    return render(request, "admin/service.html", {"admin_user": admin_user})



# @login_required(login_url='admin_login')
def admin_users(request):
    if not request.session.get("admin_logged_in"):
        messages.error(request, "Please login first.")
        return redirect("admin_login")
    return render(request, "admin/users.html")
    


# @login_required(login_url='admin_login')
def admin_blog(request):
    if not request.session.get("admin_logged_in"):
        messages.error(request, "Please login first.")
        return redirect("admin_login")
    return render(request, "admin/blog.html")


# @login_required(login_url='admin_login')
def admin_portfolio(request):
    if not request.session.get("admin_logged_in"):
        messages.error(request, "Please login first.")
        return redirect("admin_login")
    if request.method == "POST":
        title = request.POST.get('title')
        description = request.POST.get('description')
        category = request.POST.get('category')
        video = request.FILES.get('video')

        if not all([title, description, category, video]):
            messages.error(request, "All fields are required.")
            return render(request, "admin/add_portfolio.html")

        Portfolio.objects.create(
            title=title,
            description=description,
            category=category,
            video=video
        )
        messages.success(request, "Portfolio added successfully!")
        return redirect("admin_portfolio")

    portfolios = Portfolio.objects.all().order_by('-id')
    
    admin_user = None
    if "admin_username" in request.session:
        try:
            admin_user = nexaadmin.objects.get(username=request.session["admin_username"])
        except nexaadmin.DoesNotExist:
            admin_user = None
    return render(request, "admin/portfolio.html", {
        "portfolios": portfolios,
        "admin_user": admin_user})


# @login_required(login_url='admin_login')
def admin_team(request):
    if not request.session.get("admin_logged_in"):
        messages.error(request, "Please login first.")
        return redirect("admin_login")
    if request.method == "POST":
        name = request.POST.get("name")
        position = request.POST.get("position")
        description = request.POST.get("description")
        image = request.FILES.get("image")

        if name and position:
            Team.objects.create(
                name=name, position=position, description=description, image=image
            )
            messages.success(request, "Team member added successfully!")
            return redirect("admin_team")
        else:
            messages.error(request, "Name and Position are required.")

    teams = Team.objects.all()

    admin_user = None
    if "admin_username" in request.session:
        try:
            admin_user = nexaadmin.objects.get(username=request.session["admin_username"])
        except nexaadmin.DoesNotExist:
            admin_user = None

    return render(request, "admin/team.html", {"teams": teams,"admin_user": admin_user})


def update_team_member(request, member_id):
    if not request.session.get("admin_logged_in"):
        messages.error(request, "Please login first.")
        return redirect("admin_login")

    member = get_object_or_404(Team, id=member_id)

    if request.method == "POST":
        name = request.POST.get("name")
        position = request.POST.get("position")
        description = request.POST.get("description")
        image = request.FILES.get("image")

        member.name = name
        member.position = position
        member.description = description

        if image:  # Update image only if a new one is uploaded
            member.image = image

        member.save()
        messages.success(request, "Team member updated successfully!")
        return redirect("admin_team")

    return render(request, "admin/updateteam.html", {"member": member})


def delete_team_member(request, member_id):
    if not request.session.get("admin_logged_in"):
        messages.error(request, "Please login first.")
        return redirect("admin_login")

    member = get_object_or_404(Team, id=member_id)
    member.delete()
    messages.success(request, "Team member deleted successfully!")
    return redirect("admin_team")


# @login_required(login_url='admin_login')

def admin_settings(request):
    if not request.session.get("admin_logged_in"):
        messages.error(request, "Please login first.")
        return redirect("admin_login")
    
    
    contacts = Contact.objects.all()  
    admin_user = None
    if "admin_username" in request.session:
        try:
            admin_user = nexaadmin.objects.get(username=request.session["admin_username"])
        except nexaadmin.DoesNotExist:
            admin_user = None 
    return render(request, "admin/settings.html", {"contacts": contacts, "admin_user": admin_user})  

def delete_contact(request, contact_id):
    if not request.session.get("admin_logged_in"):
        messages.error(request, "Please login first.")
        return redirect("admin_login")

    contact = get_object_or_404(Contact, id=contact_id)
    contact.delete()
    messages.success(request, "Contact deleted successfully.")
    return redirect("admin_settings")

# @login_required(login_url='admin_login')
def admin_edit(request):
    if not request.session.get("admin_logged_in"):
        messages.error(request, "Please login first.")
        return redirect("admin_login")
    return render(request, "admin/edit.html")


def admin_signup(request):
    if request.method == "POST":
        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password")
        confirm_password = request.POST.get("confirm_password")
        image = request.FILES.get("image")

        # Validation checks
        if not all([username, email, password, confirm_password]):
            messages.error(request, "All fields are required.")
            return redirect("admin_signup")

        if password != confirm_password:
            messages.error(request, "Passwords do not match.")
            return redirect("admin_signup")

        if nexaadmin.objects.filter(username=username).exists():
            messages.error(request, "Username already exists.")
            return redirect("admin_signup")

        if nexaadmin.objects.filter(email=email).exists():
            messages.error(request, "Email already registered.")
            return redirect("admin_signup")

        # Create the admin user
        nexaadmin.objects.create(
            username=username, email=email, password=password, image=image
        )

        messages.success(request, "Account created successfully.")
        return redirect("admin_login")

    # Handle GET request (important!)
    return render(request, "admin/signup.html")


def admin_forgot_password(request):
    if not request.session.get("admin_logged_in"):
        messages.error(request, "Please login first.")
        return redirect("admin_login")
    return render(request, "admin/forgotpassword.html")


def admin_blogs(request):
    if not request.session.get("admin_logged_in"):
        messages.error(request, "Please login first.")
        return redirect("admin_login")

    if request.method == "POST":
        title = request.POST.get("title")
        content = request.POST.get("content")
        images = request.FILES.getlist("photos")

        if not title or not content:
            return render(
                request,
                "admin/blogs.html",
                {"error": "Title and content are required."},
            )

        blog_post = post.objects.create(title=title, descriptions=content)

        for image in images:
            postimage.objects.create(blog=blog_post, image=image)

        return redirect("admin_blogs")

    blogs = post.objects.all().order_by("-id").prefetch_related("images")

    admin_user = None
    if "admin_username" in request.session:
        try:
            admin_user = nexaadmin.objects.get(username=request.session["admin_username"])
        except nexaadmin.DoesNotExist:
            admin_user = None 
        return render(request, "admin/blogs.html", {"blogs": blogs, "admin_user": admin_user})


def updateblog(request, id):
    if not request.session.get("admin_logged_in"):
        messages.error(request, "Please login first.")
        return redirect("admin_login")

    blog = get_object_or_404(post, id=id)

    if request.method == "POST":
        title = request.POST.get("title")
        content = request.POST.get("content")
        images = request.FILES.getlist("photos")

        if not title or not content:
            messages.error(request, "Title and content are required.")
            return render(request, "admin/updateblog.html", {"blog": blog})

        blog.title = title
        blog.descriptions = content
        blog.save()

        # Add new images if any
        for image in images:
            postimage.objects.create(blog=blog, image=image)

        messages.success(request, "Blog updated successfully!")
        return redirect("admin_blogs")

    return render(request, "admin/updateblog.html", {"blog": blog})


def deleteblog(request, id):
    if not request.session.get("admin_logged_in"):
        messages.error(request, "Please login first.")
        return redirect("admin_login")

    blog = get_object_or_404(post, id=id)
    blog.images.all().delete()
    blog.delete()
    messages.success(request, "Blog deleted successfully!")
    return redirect("admin_blogs")


def admin_call_to_action(request):
    if not request.session.get("admin_logged_in"):
        messages.error(request, "Please login first.")
        return redirect("admin_login")

    return render(request, "admin/call_to_action.html")
