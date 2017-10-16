import React, { Component } from 'react';
import { Form, Text } from 'react-form'

class RadioGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: ""
        }
        this.handleOptionChange = this.handleOptionChange.bind(this);
    }

    handleOptionChange(event) {
        // this.setState({
        //     selectedOption: event.target.value
        // });
        this.props.onChange(event)
    }

    render() {
        const fields = this.props.fields;
        const listRadios = fields.map((field) =>
            <div> 
            <input 
                type="radio"
                value={field}
                name={this.props.name}
                selected={this.state.selectedOption === field}
                onChange={this.handleOptionChange}
            />
            {field}
            </div>
        )

        return (
            <div>
                <b>{this.props.label}</b>
                {listRadios}
            </div>
        )
    }
}

class TextInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {value: ""}

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        // this.setState({value: event.target.value});
        this.props.onChange(event)
    }

    render() {
        return (
            <label>
                {this.props.label}
                <input 
                    type="text" 
                    name={this.props.name}
                    value={this.props.value} 
                    onChange={this.handleChange} />
                <br />
            </label>
        )
    }
}

class SignupForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fitnessGoalOption: "",
            experienceLevelOption: "",
            weight: '',
            height: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        console.log(name);

        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        console.log("submit!", this.state);
        event.preventDefault();
    }

    render() {
        const fitnessGoalFields = ["Strength Training", "Weight Loss", "Cardio"];
        const experienceLevelFields = ["New", "< 1 Year", "1 - 3 years", "3+ years"];
        const name = "Fitness Goals"

        return (
            <form onSubmit={this.handleSubmit}>
                <RadioGroup 
                    name="fitnessGoalOption"
                    label="Fitness Goals" 
                    fields={fitnessGoalFields} 
                    onChange={this.handleInputChange}
                    value={this.state.fitnessGoalOption}
                /> <br />

                <RadioGroup 
                    name="experienceLevelOption"
                    label="Experience Level"
                    fields={experienceLevelFields} 
                    onChange={this.handleInputChange}
                    value={this.state.experienceLevelOption}
                /><br />

                <TextInput 
                    name="weight"
                    label="What is your weight?" 
                    onChange={this.handleInputChange}
                    value={this.state.weight}
                /><br />
                <TextInput 
                    name="height"
                    label="What is your height?" 
                    onChange={this.handleInputChange}
                    value={this.state.height}
                /><br />

                <input type="submit" value="Submit" />
            </form>
        )
    }
}
  
export default SignupForm