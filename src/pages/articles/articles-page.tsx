// src/pages/ArticlesPage.tsx

import React from 'react';
import Article from '../../components/articles/article-card.tsx';

import '../../styles/articles.css';

const ArticlesPage = () => {
  const articles = [
    {
      title: 'Primul Articol',
      description:
        'Acesta este primul articol pe care îl publicăm pe acest site. Vom discuta despre diverse teme interesante.',
      publishedDate: '2024-11-29',
    },
    {
      title: 'Al Doilea Articol',
      description:
        'Acesta este al doilea articol. În acest articol, vom analiza tendințele actuale din tehnologie.',
      publishedDate: '2024-11-25',
    },
    {
      title: 'Articolul Despre React',
      description:
        'Într-o eră în care tehnologia avansează rapid, iar schimbările din societate sunt din ce în ce mai vizibile, avem responsabilitatea de a ne adapta și de a înțelege cum fiecare decizie pe care o luăm poate influența viitorul. De-a lungul istoriei, umanitatea a înfruntat provocări majore, dar a reușit să evolueze datorită inovațiilor și adaptabilității. Fiecare generație a avut de-a face cu propriile dificultăți, dar și cu oportunități imense, iar cheia succesului a fost întotdeauna capacitatea de a învăța din trecut, de a înțelege prezentul și de a anticipa viitorul. Astăzi, în mijlocul revoluției digitale, suntem martorii unor schimbări fundamentale în modul în care interacționăm unii cu alții, în modul în care comunicăm, învățăm, muncim și trăim. Tehnologiile emergente, cum ar fi inteligența artificială, învățarea automată și automatizarea, au un impact semnificativ asupra tuturor industriilor, iar viitorul promite să adâncească și mai mult aceste schimbări. Cu toate acestea, aceste progrese nu vin fără provocările lor. Unele dintre cele mai mari dileme ale societății moderne sunt legate de modul în care utilizăm aceste tehnologii pentru a îmbunătăți viața oamenilor, în timp ce protejăm valorile fundamentale ale demnității și ale drepturilor individuale.Un aspect esențial în această perioadă de schimbare este educația. Educația reprezintă cheia care ne permite să înțelegem și să navigăm în complexitatea lumii moderne. De la tehnologiile emergente la schimbările climatice și problemele sociale, educația ne ajută să dezvoltăm competențele necesare pentru a face față provocărilor și pentru a contribui la soluțiile care vor modela viitorul. Este important să înțelegem că educația nu se referă doar la învățarea unor concepte teoretice, ci și la dezvoltarea abilităților critice și a gândirii analitice, care sunt esențiale pentru a lua decizii informate în fața incertitudinii.Mai mult decât atât, globalizarea a dus la o interconectare mai strânsă a țărilor și a economiilor, dar și la o interdependență mai mare între națiuni. Problemele economice, politice și sociale ale unei țări au un impact global, iar soluțiile necesită colaborare și dialog între diversele culturi și economii. Aceste interacțiuni internaționale sunt esențiale pentru rezolvarea provocărilor globale, cum ar fi schimbările climatice, securitatea cibernetică, gestionarea resurselor naturale și prevenirea conflictelor.',
      publishedDate: '2024-11-20',
    },
  ];

  return (
    <div className="articles-page">
      {articles.map((article, index) => (
        <Article
          key={index}
          title={article.title}
          description={article.description}
          publishedDate={article.publishedDate}
        />
      ))}
    </div>
  );
};

export default ArticlesPage;
