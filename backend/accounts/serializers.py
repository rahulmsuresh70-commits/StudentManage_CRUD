from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers

class AdminTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        if not self.user.is_active or not self.user.is_staff:
            raise serializers.ValidationError(
                "Only admin users can access the dashboard."
            )

        data['user'] = {
            'id': self.user.id,
            'username': self.user.get_username(),
            'email': self.user.email,
            'is_staff': self.user.is_staff,
            'is_superuser': self.user.is_superuser,
        }

        return data