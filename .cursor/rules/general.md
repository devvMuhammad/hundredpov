use next.js server actions for mutations
always use react hook form and zod for form handling and validations
use useMutation from tanstack query for mutations

if you do data fetching on server, please create corresponding skeletons for that UI as well

## SUPABASE CLIENT CREATION (IN BROWSER AND SERVER)

you need to know how to initialize clients in client and server environments

ON CLIENT

there is a supabase client creator in "@/lib/supabase/client", just call the createClient function outside the component and use that

ON SERVER

there is a supabase client creator in "@/lib/supabase/server", call that in function using await and then use it
