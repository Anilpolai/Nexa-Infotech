from django.urls import path # type: ignore
from django.conf import settings
from django.conf.urls.static import static
from .views import (
    index, index_2, about, services, portfolio, faq, team, blog, contact, codemario,
    blog_single,

    admin_index, admin_login, admin_dashboard, admin_service, admin_users, admin_blog,
    admin_portfolio, admin_team, admin_settings, admin_edit, admin_signup,
    admin_forgot_password, admin_logout, admin_blogs, admin_call_to_action,updateblog,deleteblog,delete_team_member,update_team_member,delete_contact
)

urlpatterns = [
    # Client URLs
    path('', index, name='index'),
    path('index_2/', index_2, name='index_2'),
    path('about/', about, name='about'),
    path('service/', services, name='service'),
    path('services/', services, name='services'),
    path('portfolio/', portfolio, name='portfolio'),
    path('faq/', faq, name='faq'),
    path('team/', team, name='team'),
    path('blog/', blog, name='blog'),
    path('contact/', contact, name='contact'),
    path('codemario/', codemario, name='codemario'),
    path('blog-single/', blog_single, name='blog-single'),

    # Admin URLs
    path('admin/', admin_login, name='admin'),
    path('admin/login/', admin_login, name='admin_login'),
    path('admin/logout/', admin_logout, name='admin_logout'),
    path('admin/dashboard/', admin_dashboard, name='admin_dashboard'),
    path('admin/service/', admin_service, name='admin_service'),
    path('admin/users/', admin_users, name='admin_users'),
    path('admin/blog/', admin_blog, name='admin_blog'),
    path('admin/portfolio/', admin_portfolio, name='admin_portfolio'),
    path('admin/team/', admin_team, name='admin_team'),
    path('admin/team/update/<int:member_id>/',update_team_member, name='update_team_member'),
    path('admin/team/delete/<int:member_id>/',delete_team_member, name='delete_team_member'),
    path('admin/settings/', admin_settings, name='admin_settings'),
    path('admin/contact/delete/<int:contact_id>/', delete_contact, name='delete_contact'),
    path('admin/edit/', admin_edit, name='admin_edit'),
    path('admin/signup/', admin_signup, name='admin_signup'),
    path('admin/forgotpassword/', admin_forgot_password, name='admin_forgot_password'),
    path('admin/blogs/', admin_blogs, name='admin_blogs'),
    path('admin/updateblog/<int:id>/',updateblog,name='updateblog'),
    path('admin/blogs/delete/<int:id>/', deleteblog, name='deleteblog'),
    path('admin/call-to-action/', admin_call_to_action, name='admin_call_to_action'),

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)