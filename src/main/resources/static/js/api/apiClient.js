export const newSurveyData = [
    {
        title: "Environment Safety & Protocols",
        questions: [
            { 
                id: "1", 
                content: "Are emergency exit routes and evacuation maps clearly visible throughout the site?", 
                type: "RADIO",
                choices: [ {text: "Yes"}, {text: "No"}, {text: "Partial"} ]
            },
            { 
                id: "2", 
                content: "Is there a designated 'Safe Zone' or higher ground accessible within 5 minutes of the main attraction?", 
                type: "RADIO",
                choices: [ {text: "Yes"}, {text: "No"} ]
            },
            { 
                id: "3", 
                content: "Are hazardous areas (e.g., steep cliffs, slippery paths) marked with warning signs in both English and Filipino?", 
                type: "RADIO",
                choices: [ {text: "Yes"}, {text: "No"} ]
            },
            { 
                id: "4", 
                content: "Are there Certified First Aid Responders on duty within the hours of Operation?", 
                type: "RADIO",
                choices: [ {text: "Yes"}, {text: "No"} ]
            },
            { 
                id: "5", 
                content: "How often does the staff conduct simulated emergency evacuation drills?", 
                type: "DROPDOWN",
                choices: [ {text: "Monthly"}, {text: "Quarterly"}, {text: "Bi-Annually"}, {text: "Never"}, {text: "I don't know"} ]
            }
        ]
    },
    {
        title: "Emergency Communication & Systems",
        questions: [
            { 
                id: "6", 
                content: "Is there a mobile signal or radio communication available for emergency calls?", 
                type: "RADIO", 
                choices: [ {text: "Yes"}, {text: "No"} ]
            },
            { 
                id: "7", 
                content: "What is the primary mode of emergency communication available for tourists?", 
                type: "CHECKBOX", 
                choices: [ {text: "Megaphones"}, {text: "Digital Signage"}, {text: "Sirens"}, {text: "Local Staff"}, {text: "None"} ] 
            },
            { 
                id: "8", 
                content: "Is there a digital system in place to push emergency notifications to visitors' mobile devices upon entry?", 
                type: "RADIO", 
                choices: [ {text: "Yes"}, {text: "No"} ]
            },
            { 
                id: "9", 
                content: "Are digital maps of the site available for download or via QR codes for offline use?", 
                type: "RADIO", 
                choices: [ {text: "Yes"}, {text: "No"} ]
            }
        ]
    },
    {
        title: "Infrastructure & Environmental Monitoring",
        questions: [
            { 
                id: "10", 
                content: "In the event of heavy rainfall, are there automated systems or staff protocols to monitor soil stability or rising water levels?", 
                type: "RADIO",
                choices: [ {text: "Yes"}, {text: "No"} ]
            },
            { 
                id: "11", 
                content: "Have the structures on-site undergone a structural integrity audit within the last 3 years to ensure earthquake resilience?", 
                type: "RADIO", 
                choices: [ {text: "Yes"}, {text: "No"} ] 
            },
            { 
                id: "12", 
                content: "Does the site management receive real-time weather updates from PAGASA or local DRRMO?", 
                type: "RADIO", 
                choices: [ {text: "Yes"}, {text: "No"} ] 
            },
            { 
                id: "13", 
                content: "Are evacuation routes and 'Safe Zones' designed to be accessible for Persons with Disabilities (PWDs) and senior citizens?", 
                type: "RADIO", 
                choices: [ {text: "Yes"}, {text: "No"}, {text: "Partial"} ] 
            }
        ]
    }
];