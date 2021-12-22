from django.db import models

from django.contrib.auth.models import BaseUserManager, AbstractUser

class BaseManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, username, password, **extrafields):
        if not username:
            raise ValueError('Informe o usuário')
        username = self.model.normalize_username(username)
        user = self.model(username=username, **extrafields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, password, **extrafields):
        extrafields.setdefault('is_staff', True)
        extrafields.setdefault('is_superuser', False)
        return self._create_user(username, password, **extrafields)

    def create_superuser(self, username, password, **extrafields):
        extrafields.setdefault('is_staff', True)
        extrafields.setdefault('is_superuser', True)

        if extrafields.get('is_staff') is not True:
            raise ValueError('Precisa ser true')
        if extrafields.get('is_superuser') is not True:
            raise ValueError('Precisa ser true')

        return self._create_user(username, password, **extrafields)


class User(AbstractUser):
    email = models.EmailField(
        max_length=255, blank=False, null=False)

    status = models.BooleanField(default=True)
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['password', 'first_name', 'last_name', 'email']
    objects = BaseManager()

    class Meta:
        db_table = 'usuario'

class Base(models.Model):
    created_at = models.DateField(auto_now_add=True)
    time_created = models.TimeField(auto_now=True)
    class Meta:
        abstract = True
        
class Event(Base):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255, null=True, blank=False)
    description = models.TextField()
    start_time = models.TimeField()
    finish_time = models.TimeField()
    city = models.CharField(max_length=255)
    private = models.BooleanField(default=False)
    capacity = models.IntegerField(blank=True, null=True)
    user_owner = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        db_table = 'event'

class EventUser(Base):
    id = models.AutoField(primary_key=True)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    id_event = models.ForeignKey(Event, on_delete=models.CASCADE)

    class Meta:
        db_table = 'event_user'