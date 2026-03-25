const express = require('express'); // 1. Load the Express kitchen
const cors = require('cors');
const app = express();              // 2. Create an instance of our server
const PORT = 3000;                  // 3. Set the radio frequency (Port 3000)
app.use(cors());

app.use(express.json());

const personalWorkouts = [
    { id: 1, exercise: "Barbell Bench Press", sets: 4, reps: "8 - 10", status: "Completed" },
    { id: 2, exercise: "Overhead Shoulder Press", sets: 3, reps: " 10 - 12", status: "Pending" },
    { id: 3, exercise: "Dumbbell Incline Flys", sets: 3, reps: "12", status: "Pending" },
    { id: 4, exercise: "Tricep Pushdowns", sets: 4, reps: "15", status: "Pending" }
];

app.get('/api/workouts', (request, response) => {
    response.json(personalWorkouts);
});

app.get('/', (request, response) => {
    response.send('<h1>🏋️‍♂️ Welcome to the Apex Fitness Secure Vault!</h1>')
});

app.post('/api/workouts', (req, res) => {
    const newWorkout = req.body;
    newWorkout.id = Date.now();
    personalWorkouts.push(newWorkout);
    console.log("New Workout added with ID:", newWorkout.id);
    res.status(201).json({ message: "Workout added successfully!", data: newWorkout });
})

app.put('/api/workouts/:id/complete', (req, res) => {
    const workoutId = parseInt(req.params.id);
    const workoutToUpdate = personalWorkouts.find(w => w.id === workoutId);

    if (workoutToUpdate) {
        workoutToUpdate.status = "Completed";
        console.log(`Workout ID ${workoutId} marked as Completed!`);
        res.json({ message: "Workout updated successfully!", data: workoutToUpdate});
    } else {
        res.status(404).json({ message: "Workout not found!" })
    }
});

app.listen(PORT, () => {
    console.log(`✅ Success! Fitness Vault is running on http://localhost:${PORT}`);
});
