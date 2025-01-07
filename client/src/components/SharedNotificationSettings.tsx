import {
  NotificationSettingsFormData,
  notificationSettingsSchema,
} from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateUserMutation } from "@/state/api";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { useForm } from "react-hook-form";

const SharedNotificationSettings = ({
  title = "Notification Settings",
  subtitle = "Manage Your Notification Settings",
}: SharedNotificationSettingsProps) => {
  const { user } = useUser();
  const [updateUser] = useUpdateUserMutation();

  const currentSettings =
    (user?.publicMetadata as { settings?: UserSettings })?.settings || {};

  const methods = useForm<NotificationSettingsFormData>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      courseNotifications: currentSettings.courseNotifications || false,
      emailAlerts: currentSettings.emailAlerts || false,
      smsAlerts: currentSettings.smsAlerts || false,
      notificationFrequency:
        currentSettings.notificationFrequency || "immediate",
    },
  });

  const onSubmit = async (data: NotificationSettingsFormData) => {
    if (!user) return;

    const updatedUser = {
      userId: user.id,
      publicMetaData: {
        ...user.publicMetadata,
        settings: {
          ...currentSettings,
          ...data,
        },
      },
    };

    try {
      await updateUser(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return <div>SharedNotificationSettings</div>;
};

export default SharedNotificationSettings;
