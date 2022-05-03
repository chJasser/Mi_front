import React, { FC, useEffect, useState } from "react";

const Chat = () => {
  useEffect(() => {
    (function (d, m) {
      var kommunicateSettings = {
        appId: "1bf85e55b46230b3482654d3074d825e6",
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
      };

      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      //s.src = "https://www.kommunicate.io/livechat-demo?appId=1bf85e55b46230b3482654d3074d825e6&botIds=mi-bot-8vrxm&assignee=mi-bot-8vrxm";
      console.log(s);
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }, []);

  return <div></div>;
};

export default Chat;
