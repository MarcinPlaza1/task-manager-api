import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    subtasks: [{
        title: { type: String, required: true },
        completed: { type: Boolean, default: false }
    }],
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    collaborators: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    description: {
        type: String,
        trim: true,
        validate(value) {
            if (value && value.length < 10) {
                throw new Error('The task description must be at least 10 characters long');
            }
        }
    },
    completed: {
        type: Boolean,
        default: false
    },
    deadline: {
        type: Date,
        validate(value) {
            if (value && value < Date.now()) {
                throw new Error('The date of performance must not be in the past');
            }
        }
    },
    tags: [{
        type: String,
        trim: true,
        maxlength: 30
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
