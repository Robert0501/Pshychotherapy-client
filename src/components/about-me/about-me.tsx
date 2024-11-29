import React, { useRef, useEffect } from 'react';

import '../../styles/about-me.css';

function AboutMe() {
  const me = {
    name: 'Patricia Jurj',
    location: 'Cluj-Napoca',
    description:
      'Ma bucur să te cunosc, sunt Patricia:\n🌻psihoterapeut cognitiv comportamental\n🌻 terapeut ABA.\nÎmi văd călătoria profesională ca urcarea pe munte: chiar dacă uneori mă opresc să-mi scutur bocancii  și să-mi adun forțele, mă bucur de fiecare lecție și peisaj din drumul meu către vârf.\nCred în puterea dezvoltării continue și a depășirii zonei de confort pentru a crește atât personal, cât și profesional. Deși îmi separ clar rolurile profesionale de cele personale, îmi place să aduc în munca mea, o parte din esența lutului din care am fost plămădită: creativitatea, pragmatismul și realismul. \nÎmbin tehnicile profesionale cu autenticitatea și spontaneitatea, creând astfel un mediu de lucru personalizat și valoros, iar atunci când lucrez cu cei mici, mă ghidez după copilăria mea, înțelegând cât de important este jocul și flexibilitatea. ',
  };

  // Ref for the textarea
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-adjust the height of the textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height to calculate new height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height to fit content
    }
  }, [me.description]);

  return (
    <div className="container--profile">
      <section className="section--profile">
        <img
          className="profile-picture"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s"
          alt="Profile"
        />
        <h2>{me.name}</h2>
        <h3>{me.location}</h3>
      </section>
      <section className="section--description">
        {/* Read-only textarea with dynamic height */}
        <textarea
          ref={textareaRef}
          className="description-textarea"
          value={me.description}
          readOnly
        />
      </section>
    </div>
  );
}

export default AboutMe;
