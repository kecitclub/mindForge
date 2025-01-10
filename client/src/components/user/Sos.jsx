// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Ambulance, Flame, Shield, Phone } from "lucide-react";

// const services = [
//   {
//     name: "Ambulance",
//     icon: Ambulance,
//     iconColor: "text-red-500",
//     bgColor: "hover:bg-red-50",
//   },
//   {
//     name: "Fire Brigade",
//     icon: Flame,
//     iconColor: "text-orange-500",
//     bgColor: "hover:bg-orange-50",
//   },
//   {
//     name: "Police",
//     icon: Shield,
//     iconColor: "text-blue-500",
//     bgColor: "hover:bg-blue-50",
//   },
// ];

// export default function EmergencyInterface() {
//   return (
//     <div className=" bg-gray-50 flex items-center justify-center p-4">
//       <div className="w-full space-y-8">
//         <div className="flex flex-col items-center text-center space-y-4">
//           <Button
//             variant="destructive"
//             size="lg"
//             className="w-32 h-32 rounded-full text-2xl font-bold shadow-lg animate-pulse hover:shadow-xl transition-shadow"
//             onClick={() => console.log("SOS Pressed")}
//           >
//             <button id="sos">
//             <div className="flex flex-col items-center">
//               <Phone className="h-8 w-8 mb-2" />
//               SOS
//             </div>
//             </button>
//           </Button>
//           <p className="text-lg lg:text-2xl text-gray-600">
//             Press for Emergency
//           </p>
//           <p className="text-lg lg:text-xl text-gray-500 ">
//             Pressing the SOS button will alert all emergency services in your
//             area
//           </p>
//         </div>

//         <div className=" w-full flex grid-cols-3 gap-4">
//           {services.map((service) => (
//             <Card
//               key={service.name}
//               className={`p-4 flex flex-1 flex-col items-center space-y-2 cursor-pointer transition-colors ${service.bgColor}`}
//             >
//               <service.icon
//                 className={`h-6 w-6 lg:h-10 lg:w-10 ${service.iconColor}`}
//               />
//               <span className="text-sm lg:text-xl font-medium">
//                 {service.name}
//               </span>
//               <span className="px-2 py-1 bg-green-100 text-green-700 text-sm lg:text-base rounded-full font-medium">
//                 Ready
//               </span>
//             </Card>
//           ))}
//         </div>

//         <div className="bg-red-50 border border-red-200 rounded-lg  p-4">
//           <p className="text-red-600 text-base lg:text-xl text-center">
//             Only use SOS for genuine emergencies. False alarms may result in
//             penalties.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Ambulance, Flame, Shield, Phone } from "lucide-react";

const services = [
  {
    name: "Ambulance",
    icon: Ambulance,
    iconColor: "text-red-500",
    bgColor: "hover:bg-red-50",
  },
  {
    name: "Fire Brigade",
    icon: Flame,
    iconColor: "text-orange-500",
    bgColor: "hover:bg-orange-50",
  },
  {
    name: "Police",
    icon: Shield,
    iconColor: "text-blue-500",
    bgColor: "hover:bg-blue-50",
  },
];

export default function EmergencyInterface() {
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;

    let isListening = false; // Track listening state

    // Start recognition when the button is pressed
    const startListening = () => {
      if (!isListening) {
        recognition.start();
        isListening = true;
        console.log("Listening for voice command...");
      }
    };

    // Stop recognition when the button is released
    const stopListening = () => {
      if (isListening) {
        recognition.stop();
        isListening = false;
        console.log("Stopped listening.");
      }
    };

    // Handle speech recognition result
    recognition.addEventListener("result", (event) => {
      const transcript = event.results[0][0].transcript.trim().toLowerCase();
      console.log(`Heard: "${transcript}"`);

      if (transcript === "emergency") {
        console.log("SOS Message Sent to Ambulance");
        console.log("SOS Message Sent to Fire Brigade");
        console.log("SOS Message Sent to Police");
      } else {
        console.log(`Command "${transcript}" not recognized.`);
      }
    });

    recognition.addEventListener("error", (event) => {
      console.error("Speech Recognition Error:", event.error);
    });

    // Attach push-to-talk events to the SOS button
    const sosButton = document.getElementById("sos");

    if (sosButton) {
      sosButton.addEventListener("mousedown", startListening);
      sosButton.addEventListener("mouseup", stopListening);
      sosButton.addEventListener("mouseleave", stopListening);
    }

    return () => {
      if (sosButton) {
        sosButton.removeEventListener("mousedown", startListening);
        sosButton.removeEventListener("mouseup", stopListening);
        sosButton.removeEventListener("mouseleave", stopListening);
      }
    };
  }, []);

  return (
    <div className="bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full space-y-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <Button
            variant="destructive"
            size="lg"
            className="w-32 h-32 rounded-full text-2xl font-bold shadow-lg hover:shadow-xl transition-shadow"
          >
            <button id="sos" className="w-full h-full">
              <div className="flex flex-col items-center">
                <Phone className="h-8 w-8 mb-2" />
                SOS
              </div>
            </button>
          </Button>
          <p className="text-lg lg:text-2xl text-gray-600">
            Hold to talk for Emergency
          </p>
          <p className="text-lg lg:text-xl text-gray-500">
            Press and hold the SOS button to send a voice command.
          </p>
        </div>

        <div className="w-full flex grid-cols-3 gap-4">
          {services.map((service) => (
            <Card
              key={service.name}
              className={`p-4 flex flex-1 flex-col items-center space-y-2 cursor-pointer transition-colors ${service.bgColor}`}
            >
              <service.icon
                className={`h-6 w-6 lg:h-10 lg:w-10 ${service.iconColor}`}
              />
              <span className="text-sm lg:text-xl font-medium">
                {service.name}
              </span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-sm lg:text-base rounded-full font-medium">
                Ready
              </span>
            </Card>
          ))}
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-base lg:text-xl text-center">
            Only use SOS for genuine emergencies. False alarms may result in
            penalties.
          </p>
        </div>
      </div>
    </div>
  );
}
