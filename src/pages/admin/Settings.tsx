import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Save, RefreshCw, Bell, UserCog, Database, Library, Mail } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().optional(),
  newPassword: z.string().optional(),
  confirmPassword: z.string().optional(),
}).refine(data => {
  if (data.password && (!data.newPassword || !data.confirmPassword)) {
    return false;
  }
  return true;
}, {
  message: "Please enter both new password and confirmation",
  path: ["newPassword"],
}).refine(data => {
  if (data.newPassword && data.newPassword !== data.confirmPassword) {
    return false;
  }
  return true;
}, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const libraryFormSchema = z.object({
  libraryName: z.string().min(2, {
    message: "Library name must be at least 2 characters.",
  }),
  loanDuration: z.string().min(1, {
    message: "Please enter a valid loan duration.",
  }),
  maxBooks: z.string().min(1, {
    message: "Please enter a valid maximum books per student.",
  }),
  enableFines: z.boolean(),
  fineRate: z.string().optional(),
});

const notificationFormSchema = z.object({
  emailNotifications: z.boolean(),
  overdueReminders: z.boolean(),
  newRequestAlerts: z.boolean(),
  emailTemplate: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type LibraryFormValues = z.infer<typeof libraryFormSchema>;
type NotificationFormValues = z.infer<typeof notificationFormSchema>;

const Settings = () => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "Admin User",
      email: "admin@library.org",
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const libraryForm = useForm<LibraryFormValues>({
    resolver: zodResolver(libraryFormSchema),
    defaultValues: {
      libraryName: "School Library",
      loanDuration: "14",
      maxBooks: "3",
      enableFines: true,
      fineRate: "0.50",
    },
  });

  const notificationForm = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      emailNotifications: true,
      overdueReminders: true,
      newRequestAlerts: true,
      emailTemplate: "Dear {{student_name}},\n\nThis is a reminder that the following book is now overdue:\n{{book_title}} by {{book_author}}\n\nPlease return it as soon as possible.\n\nRegards,\nThe Library Team",
    },
  });

  function onProfileSubmit(data: ProfileFormValues) {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
      console.log(data);
    }, 1000);
  }

  function onLibrarySubmit(data: LibraryFormValues) {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Library settings updated",
        description: "Library settings have been updated successfully.",
      });
      console.log(data);
    }, 1000);
  }

  function onNotificationSubmit(data: NotificationFormValues) {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Notification settings updated",
        description: "Notification settings have been updated successfully.",
      });
      console.log(data);
    }, 1000);
  }

  return (
    <AdminLayout title="Settings">
      <div className="grid gap-8">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <UserCog size={16} />
              Account
            </TabsTrigger>
            <TabsTrigger value="library" className="flex items-center gap-2">
              <Library size={16} />
              Library
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell size={16} />
              Notifications
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account information and password.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                    <FormField
                      control={profileForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="border-t pt-4 mt-4">
                      <h3 className="text-lg font-medium mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <FormField
                          control={profileForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Current Password</FormLabel>
                              <FormControl>
                                <Input {...field} type="password" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="newPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>New Password</FormLabel>
                              <FormControl>
                                <Input {...field} type="password" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={profileForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <Input {...field} type="password" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full sm:w-auto flex items-center gap-2"
                      disabled={isSaving}
                    >
                      {isSaving ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                      Save Profile
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="library">
            <Card>
              <CardHeader>
                <CardTitle>Library Settings</CardTitle>
                <CardDescription>
                  Configure your library's operational parameters.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...libraryForm}>
                  <form onSubmit={libraryForm.handleSubmit(onLibrarySubmit)} className="space-y-6">
                    <FormField
                      control={libraryForm.control}
                      name="libraryName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Library Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={libraryForm.control}
                        name="loanDuration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Default Loan Duration (Days)</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" min="1" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={libraryForm.control}
                        name="maxBooks"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Maximum Books Per Student</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" min="1" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={libraryForm.control}
                      name="enableFines"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Enable Late Fines</FormLabel>
                            <FormDescription>
                              Charge students for overdue books
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    {libraryForm.watch("enableFines") && (
                      <FormField
                        control={libraryForm.control}
                        name="fineRate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fine Rate ($ per day overdue)</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" step="0.01" min="0" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    <Button 
                      type="submit" 
                      className="w-full sm:w-auto flex items-center gap-2"
                      disabled={isSaving}
                    >
                      {isSaving ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Database className="mr-2 h-4 w-4" />}
                      Save Library Settings
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure how and when notifications are sent to students.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...notificationForm}>
                  <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-6">
                    <FormField
                      control={notificationForm.control}
                      name="emailNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Email Notifications</FormLabel>
                            <FormDescription>
                              Send email notifications to students
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    {notificationForm.watch("emailNotifications") && (
                      <>
                        <FormField
                          control={notificationForm.control}
                          name="overdueReminders"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Overdue Reminders</FormLabel>
                                <FormDescription>
                                  Send reminders for overdue books
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={notificationForm.control}
                          name="newRequestAlerts"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">New Request Alerts</FormLabel>
                                <FormDescription>
                                  Receive alerts for new book requests
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={notificationForm.control}
                          name="emailTemplate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Template</FormLabel>
                              <FormDescription>
                                Template for overdue reminder emails. Use {'{{student_name}}'}, {'{{book_title}}'}, {'{{book_author}}'} as placeholders.
                              </FormDescription>
                              <FormControl>
                                <textarea
                                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                    <Button 
                      type="submit" 
                      className="w-full sm:w-auto flex items-center gap-2"
                      disabled={isSaving}
                    >
                      {isSaving ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-4 w-4" />}
                      Save Notification Settings
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Settings;
