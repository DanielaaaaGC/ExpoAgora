import { useEffect, useState } from "react";

const Chatbot = ({ bloqueado = false }) => {
  const [chatbotListo, setChatbotListo] = useState(false);

  // Cargar Voiceflow una sola vez
  useEffect(() => {
    const cargarChatbot = async () => {
      if (window.voiceflow?.chat) {
        setChatbotListo(true);
        return;
      }

      let script = document.getElementById("voiceflow-script");

      if (!script) {
        script = document.createElement("script");
        script.id = "voiceflow-script";
        script.src =
          "https://cdn.voiceflow.com/widget-next/bundle.mjs";
        script.type = "text/javascript";

        document.body.appendChild(script);
      }

      script.addEventListener(
        "load",
        async () => {
          if (window.voiceflow?.chat) {
            await window.voiceflow.chat.load({
              verify: {
                projectID: "6a6680cb38cf4a1faa3c7937",
              },
              url: "https://general-runtime.voiceflow.com",
              voice: {
                url: "https://runtime-api.voiceflow.com",
              },
            });

            setChatbotListo(true);
          }
        },
        { once: true }
      );
    };

    cargarChatbot();
  }, []);

  // Bloquear o mostrar según el tipo de apartado
  useEffect(() => {
    if (!chatbotListo || !window.voiceflow?.chat) return;

    if (bloqueado) {
      window.voiceflow.chat.close();
      window.voiceflow.chat.hide();
    } else {
      window.voiceflow.chat.show();
    }
  }, [bloqueado, chatbotListo]);

  return null;
};

export default Chatbot;