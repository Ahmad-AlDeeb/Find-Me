import faker
from django.core.management.base import BaseCommand
from core.models import User

class Command(BaseCommand):
    help = 'Seeds the database with initial data.'

    def handle(self, *args, **options):
        self.stdout.write("Seeding database...")

        fake = faker.Faker()
        users = [
            {
                'email': fake.unique.email(),
                'first_name': fake.first_name(),
                'last_name': fake.last_name(),
                'phone': fake.phone_number()[:11],  # Limiting phone number length to 11
                'state': fake.state(),
                'city': fake.city()
            }
            for _ in range(1000)
        ]

        for user_data in users:
            user, created = User.objects.get_or_create(**user_data)
            if created:
                self.stdout.write(f"Created user {user.email}")
            else:
                self.stdout.write(f"User {user.email} already exists")

        self.stdout.write("Database seeding completed.")
