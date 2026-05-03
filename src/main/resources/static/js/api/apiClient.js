let surveyPages2 = [
    {
        title: "Preparedness Check",
        questions: [
            { 
                id: "1", 
                content: "Do you have an Emergency Kit?", 
                type: "RADIO",
                choices: [
                    {
                        text: "Yes"
                    },
                    {
                        text: "No"
                    }
                ]
            },
            { 
                id: "2", 
                content: "Do you have working flashlights?", 
                type: "RADIO",
                choices: [
                    {
                        text: "Yes"
                    },
                    {
                        text: "Yes"
                    },
                    {
                        text: "Maybe"
                    }
                ]
            }
        ]
    },
    {
        title: "Evacuation Planning",
        questions: [
            { 
                id: "3", 
                content: "Where is your primary Evacuation Place?", 
                type: "CHECKBOX", 
                choices : [
                    {
                        text: "Barangay Hall"
                    },
                    {
                        text: "Bunker"
                    },
                    {
                        text: "Local Shelter"
                    },
                    {
                        text: "School"
                    }     
                ] 
            },
            { 
                id: "4", 
                content: "Do you know the evacuation route?", 
                type: "RADIO", 
                choices: [
                    {
                        text: "Yes"
                    },
                    {
                        text: "Yes"
                    },
                    {
                        text: "Maybe"
                    }
                ]
            }
        ]
    },
    {
        title: "Local Tourism Impacts",
        questions: [
            { 
                id: "5", 
                content: "Has flooding affected local tourist spots recently?", 
                type: "RADIO",
                choices: [
                    {
                        text: "Yes"
                    },
                    {
                        text: "Yes"
                    },
                    {
                        text: "Maybe"
                    }
                ]
            },
            { 
                id: "6", 
                content: "Which tourist spots are most vulnerable?", 
                type: "CHECKBOX", 
                choices: [
                    {
                        text: "City Plaza"
                    },
                    {
                        text: "Riverwalk Park"
                    }, 
                    {
                        text: "Mountain Trail"
                    }
                ] 
            }
        ]
    }
];