const showWinnerPopup = (winner = "It's a Draw!") => {
    //Taking the popup window
    const popUp = document.getElementById("popUpID") as HTMLDivElement | null;
    if (!popUp) {
      console.error("Fehler: Das Pop-up-Element wurde nicht gefunden.");
      return;
    }
    popUp.classList.add("popUp");
    popUp.style.display = "flex";

    //Creating the restart button
    const reStartButton = document.createElement("button");
    reStartButton.classList.add("reStartButton");
    reStartButton.textContent = "Restart";
    reStartButton.addEventListener("click", () => window.location.reload());
  
    //Creating the message
    const message = document.createElement("p") as HTMLParagraphElement;
    message.classList.add("message");
    if (winner === "w" || winner === "b")
    {
      const winColor = winner === "w" ? "White" : "Black";
      message.textContent = `${winColor} Player Won! 🎉🏆`;
    } 
    else
    {
      message.textContent = `${winner} 🎉🏆`;
    }

    //Appending the complete popup in html
    popUp.innerHTML = "";
    popUp.appendChild(message);
    popUp.appendChild(reStartButton);
}; 

export {showWinnerPopup};
