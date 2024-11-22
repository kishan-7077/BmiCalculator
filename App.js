import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, Button, Text, Card, Title } from "react-native-paper";

const App = () => {
	const [height, setHeight] = useState("");
	const [weight, setWeight] = useState("");
	const [bmi, setBmi] = useState(null);
	const [healthStatus, setHealthStatus] = useState("");

	const calculateBMI = () => {
		if (height && weight) {
			const heightInMeters = height / 100;
			const bmiValue = weight / (heightInMeters * heightInMeters);
			setBmi(bmiValue.toFixed(1));
			determineHealthStatus(bmiValue);
		}
	};

	const determineHealthStatus = (bmiValue) => {
		if (bmiValue < 18.5) {
			setHealthStatus("Underweight");
		} else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
			setHealthStatus("Normal weight");
		} else if (bmiValue >= 25 && bmiValue <= 29.9) {
			setHealthStatus("Overweight");
		} else {
			setHealthStatus("Obesity");
		}
	};

	const getHealthColor = () => {
		switch (healthStatus) {
			case "Underweight":
				return "blue";
			case "Normal weight":
				return "green";
			case "Overweight":
				return "orange";
			case "Obesity":
				return "red";
			default:
				return "black";
		}
	};

	return (
		<View style={styles.container}>
			<Card style={styles.card}>
				<Title>BMI Calculator</Title>
				<TextInput
					label="Height (cm)"
					value={height}
					onChangeText={setHeight}
					keyboardType="numeric"
					style={styles.input}
				/>
				<TextInput
					label="Weight (kg)"
					value={weight}
					onChangeText={setWeight}
					keyboardType="numeric"
					style={styles.input}
				/>
				<Button mode="contained" onPress={calculateBMI}>
					Calculate BMI
				</Button>

				{bmi && (
					<Card style={[styles.resultCard, { borderColor: getHealthColor() }]}>
						<Text style={styles.resultText}>Your BMI: {bmi}</Text>
						<Text style={[styles.statusText, { color: getHealthColor() }]}>
							Health Status: {healthStatus}
						</Text>
					</Card>
				)}
			</Card>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
	},
	card: {
		width: "100%",
		padding: 16,
		alignItems: "center",
	},
	input: {
		marginBottom: 12,
		width: "100%",
	},
	resultCard: {
		marginTop: 20,
		padding: 12,
		borderWidth: 2,
	},
	resultText: {
		fontSize: 18,
		fontWeight: "bold",
	},
	statusText: {
		fontSize: 16,
		marginTop: 10,
	},
});

export default App;
