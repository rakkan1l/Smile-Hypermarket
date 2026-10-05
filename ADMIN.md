# Managing the Smile Hypermarket website

Everything on the website — photos, phone numbers, job vacancies — is edited
from the admin panel. You do not need a developer for day-to-day changes.

## Signing in

Go to **/admin** on the website and sign in with your email and password.

Changes are live within a few seconds of pressing **Save changes**. There is
no separate "publish" step.

## What you can edit

| Section | What it controls |
| --- | --- |
| **Outlets** | Each store's main photo, its gallery slider, phone, WhatsApp, address, opening hours, departments, and whether it's open or coming soon |
| **Vacancies** | Post a job, edit it, close it when filled, or delete it |
| **Leadership** | Portraits and profile text on the Our Story page |
| **Site images** | The home page hero photo |
| **Contact** | Email addresses, office and WhatsApp numbers, social links, tagline |

## Photos

Upload JPG, PNG or WebP, up to 15 MB each. Large photos from a phone are
fine — they're compressed automatically for visitors.

Each outlet can hold up to 8 gallery photos, shown in the slider on its page.
The order you add them is the order they appear.

## Closing a vacancy vs deleting it

**Close** takes a role off the website but keeps all its details, so you can
re-advertise it later in one click. **Delete** removes it permanently.

When no vacancies are open, the careers page shows
"No Roles Available at the Moment — Check Back Soon" automatically.

## Adding staff logins

Staff accounts are created in the Supabase dashboard:

1. Open the project at <https://supabase.com/dashboard>
2. **Authentication → Users → Add user**
3. Enter their email and a password, and tick **Auto Confirm User**

Everyone with a login has full edit access.

## Changing your password

In the Supabase dashboard under **Authentication → Users**, open your user and
choose to send a password recovery email, or set a new password directly.

## If something looks wrong

If the database is ever unreachable, the website keeps serving the last
content that shipped with the code rather than breaking. So a failure shows
up as content being out of date, never as a broken page.
