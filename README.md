# mcserve
a cli utility to allow operation and manipulation of local minecraft servers.

# goals
my goal with making this utility is to allow a profile based system for managing local servers that is easy to use. I envision this being somewhat like the twitch/curse launcher in terms of functionality.

# commands
### **mcserve start**
Prompts you to select a server profile and then launch said server.

### **mcserve create**
Prompts you to select a game version from installed versions of minecraft and assign a profile name then download the server jar and run it once to generate the eula.txt then open the directory with the eula.txt

### **mcserve config**
Prompts you to select a profile then provide an interface to manipulate the server.properties file.

### **mcserve open**
Prompts to select a profile then open the profile location in the file explorer.
