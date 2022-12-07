package View;

// Class for the commands
public abstract class Command {
    private final String key; // the key for the command
    private final String description; // the description for the command

    public Command(String key, String description) {
        this.key = key;
        this.description = description;
    }

    public abstract void execute();

    public String getKey() {
        // the key is the first word of the command
        return this.key;
    }

    public String getDescription() {
        // the description is the second word of the command
        return this.description;
    }
}
