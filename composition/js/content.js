/* GÉNÉRÉ par tools/sync-content.mjs depuis content/*.json : ne pas modifier ici. */
window.CONTENT = {
  "deck": {
    "title": "Présentation ANDRIA 2026",
    "demoUrl": "https://lxp.dev.step.eco",
    "stage": {
      "logoLabel": "ANDRIA",
      "cofinancement": "Projet cofinancé par l'Union européenne",
      "years": {
        "from": "2022",
        "dash": "-",
        "to": "2026"
      },
      "partners": [
        {
          "alt": "Step"
        },
        {
          "alt": "Région Nouvelle-Aquitaine"
        },
        {
          "alt": "L'Europe s'engage en France Fonds social européen, Union européenne"
        }
      ]
    },
    "ui": {
      "continue": "Continuer",
      "nextStep": "Étape suivante",
      "demo": {
        "label": "Voir en démo",
        "aria": "Voir en démo (nouvel onglet)"
      },
      "showDetail": "{0} : afficher le détail",
      "showPreview": "{0} : afficher l'aperçu",
      "openScene": "Voir la scène →",
      "nav": {
        "title": "Plan de la présentation",
        "open": "Ouvrir le plan de la présentation",
        "close": "Fermer le plan"
      }
    }
  },
  "assess": {
    "label": "Vérifier ce qui est acquis",
    "notes": "Quatre types de quiz (QCM, vrai ou faux, associations, ordre) ; résultats du diagnostic ; remise de l'apprenant, notation par critères et commentaire. Données fictives.",
    "types": {
      "intro": {
        "h1": "Des quiz **de quatre types**",
        "lede": "Une évaluation initiale avant un module, ou un quiz d'auto-évaluation pour s'entraîner."
      },
      "quiz": {
        "etiquette": "Évaluation initiale",
        "titre": "Quiz d'auto-évaluation",
        "qtabs": {
          "tab": [
            "QCM",
            "Vrai ou faux",
            "Associations",
            "Ordre"
          ]
        },
        "qbody": {
          "qp": [
            {
              "h4": "Que décrit le HTML ?",
              "opt": [
                {
                  "span": "Les couleurs de la page",
                  "tg": "Votre réponse"
                },
                {
                  "span": "Le sens et l'organisation du contenu",
                  "tg": "Bonne réponse"
                },
                {
                  "span": "La vitesse du serveur",
                  "tg": "Votre réponse"
                }
              ]
            },
            {
              "h4": "Un parcours regroupe des modules.",
              "opt": [
                {
                  "span": "Vrai",
                  "tg": "Bonne réponse"
                },
                {
                  "span": "Faux",
                  "tg": "Votre réponse"
                }
              ]
            },
            {
              "h4": "Associez chaque niveau à son rôle.",
              "verdict": "Associations correctes",
              "pairs": [
                {
                  "term": "Parcours",
                  "answer": "regroupe des modules"
                },
                {
                  "term": "Module",
                  "answer": "regroupe des cours"
                },
                {
                  "term": "Leçon",
                  "answer": "regroupe des activités"
                }
              ],
              "startOrder": [
                1,
                2,
                0
              ]
            },
            {
              "h4": "Du plus large au plus précis.",
              "verdict": "Ordre correct",
              "items": [
                "Parcours",
                "Module",
                "Cours",
                "Leçon"
              ],
              "startOrder": [
                3,
                0,
                2,
                1
              ]
            }
          ]
        },
        "pied": {
          "qhint": "Cliquez une réponse pour la tester.",
          "bouton": "Question suivante"
        }
      }
    },
    "diagnostic": {
      "res": {
        "res-t": "Résultats du diagnostic",
        "res-k": "Détail des réponses",
        "dgrow": [
          {
            "span": "Que décrit le HTML ?",
            "tg": "Bonne réponse"
          },
          {
            "span": "Un parcours regroupe des modules",
            "tg": "Bonne réponse"
          },
          {
            "span": "Associer les niveaux à leur rôle",
            "tg": "Mauvaise réponse"
          },
          {
            "span": "Ordonner les niveaux",
            "tg": "Bonne réponse"
          }
        ]
      },
      "ringbox": {
        "rg-c": "bonnes réponses"
      }
    },
    "remise": {
      "rend": {
        "gh": "Travail remis",
        "who": [
          "Apprenant - réponse textuelle",
          "Fichiers",
          "Barème d’évaluation"
        ],
        "rtxt": "Une page se découpe en trois zones : l'en-tête avec le menu, la zone principale avec le contenu, puis le pied de page. Chaque balise indique son rôle au navigateur.",
        "file": {
          "texte": "maquette-accueil.pdf"
        },
        "bareme": {
          "li": [
            {
              "span": "Structure de la page",
              "b": "5 points"
            },
            {
              "span": "Accessibilité",
              "b": "5 points"
            },
            {
              "span": "Clarté du texte",
              "b": "5 points"
            }
          ]
        }
      },
      "grade": {
        "gh": "Notation",
        "crit": [
          {
            "span": "Structure de la page"
          },
          {
            "span": "Accessibilité"
          },
          {
            "span": "Clarté du texte"
          }
        ],
        "total": "Total : **12**/15",
        "who": "Commentaire",
        "cmt": {
          "span": "Bonne structure. Pensez à décrire les images pour les lecteurs d'écran."
        },
        "pied": {
          "warn": "Enregistrer la note"
        },
        "toast": "Note enregistrée"
      }
    }
  },
  "assistant": {
    "label": "Un assistant 24 h/24",
    "notes": "Assistant virtuel disponible 24 h/24 et 7 j/7 ; réponses contextualisées au cours ; quiz suggéré. Les réponses affichées sont des exemples scénarisés.",
    "lanceur": {
      "intro": {
        "h1": "Disponible **24 h/24, 7 j/7**",
        "lede": "Il aide dans la tâche en cours et fait des recommandations intelligentes."
      },
      "fan": {
        "q": [
          "À quoi sert cette page ?",
          "À quoi servent les menus ?",
          "Comment créer une formation ?",
          "Autres questions"
        ]
      },
      "launcher": {
        "typing": {
          "aria": "L'assistant écrit un message"
        },
        "tip": {
          "texte": "Le chatbot",
          "texte2": "est là pour vous aider.",
          "pr": "Besoin d'aide ?",
          "b": "ANDRIA"
        },
        "avatar": {
          "aria": "Ouvrir l'assistant virtuel"
        }
      }
    },
    "cours": {
      "reading": {
        "small": "Les bases du HTML",
        "h3": "La structure d'une page",
        "pas": [
          "Le HTML décrit le sens et l'organisation du contenu.",
          "La balise <main> contient le contenu principal de la page."
        ],
        "pas2": "<header> Navigation </header>\n<main> Votre contenu </main>\n<footer> Informations </footer>",
        "askbtn": {
          "span": "Demander à l'IA"
        }
      }
    },
    "quiz": {
      "quizcard": {
        "qtop": {
          "span": "Quiz généré pour vous",
          "b": "Question 1 / 4"
        },
        "h3": "Quel élément contient le contenu principal ?",
        "opt": [
          {
            "code": "<header>"
          },
          {
            "code": "<main>"
          },
          {
            "code": "<footer>"
          }
        ]
      },
      "right": "Exact. <main> identifie le contenu principal du document.",
      "wrong": "Pas tout à fait : relisez le passage sur la balise <main>."
    },
    "conversation": {
      "chead": {
        "b": "Assistant virtuel ANDRIA",
        "small": "Assistant virtuel"
      },
      "cbody": {
        "m": [
          {
            "small": "Une question sur ce passage ?"
          },
          {
            "small": "Assistant"
          },
          {
            "span": "Contenus de cours associés :",
            "b": "La structure d'une page"
          },
          {
            "p": "Vous êtes bloqué ? Vous pouvez générer un quiz pour vous aider.",
            "bouton": {
              "span": "Générer un quiz"
            }
          },
          {
            "small": "Assistant",
            "p": "Voici un quiz pour vérifier ce que vous avez compris. Répondez à côté."
          }
        ]
      },
      "cinput": {
        "span": "Posez votre question à l'assistant..."
      },
      "passages": [
        {
          "selection": "Le HTML décrit le sens et l'organisation du contenu.",
          "question": "Explique-moi avec un exemple concret.",
          "answer": [
            "Sur un site de recettes, le HTML indique ce qui est un titre, une liste d'ingrédients ou une étape de préparation.",
            "Le navigateur s'en sert pour afficher la page, et les lecteurs d'écran pour la lire."
          ]
        },
        {
          "selection": "La balise <main> contient le contenu principal de la page.",
          "question": "Explique-moi avec un exemple concret.",
          "answer": [
            "Sur un site de recettes, <main> contient la recette : les ingrédients et les étapes.",
            "Le menu de navigation reste dans <header>."
          ]
        },
        {
          "selection": "<header> Navigation </header>",
          "question": "À quoi sert cette balise ?",
          "answer": [
            "<header> regroupe l'en-tête de la page : le logo et le menu de navigation.",
            "Elle se place avant <main>, qui contient le contenu principal."
          ]
        }
      ]
    }
  },
  "care": {
    "label": "Accompagner chaque apprenant",
    "notes": "Progression de l'apprenant (reprise de la dernière leçon, avancement, profil d'apprentissage) ; humeur du jour : une barre se règle et le pictogramme se déforme en relief (morphing 3D), puis un commentaire est envoyé ; alerte de décrochage avec les données utilisées ; retour de l'équipe sur l'analyse. Données fictives.",
    "preferences": {
      "intro": {
        "h1": "Chaque apprenant **garde sa progression**",
        "lede": "Il reprend là où il s'était arrêté, suit son avancement et renseigne son rythme et ses préférences d'apprentissage."
      },
      "carte": {
        "entete": {
          "h3": "Espace de l'apprenant"
        },
        "rcols": {
          "rcol": [
            {
              "who": [
                "Rythme préféré",
                "Préférences"
              ],
              "paces": {
                "pace": [
                  "Progressif",
                  "Standard",
                  "Soutenu",
                  "Sans préférence"
                ],
                "pace-description": [
                  "Avancer tranquillement, avec davantage d'explications.",
                  "Un équilibre entre explications et mise en pratique.",
                  "Aller plus vite et droit à l'essentiel.",
                  "Adapter le rythme selon le contexte."
                ]
              },
              "pdesc": "Avancer tranquillement, avec davantage d'explications.",
              "chips": {
                "cchip": [
                  "Exemples concrets",
                  "Pas-à-pas",
                  "Synthèse",
                  "Questions d’entraînement"
                ]
              },
              "titre": "Mon profil d'apprentissage",
              "aide": "Renseigné par l'apprenant"
            },
            {
              "reprise": {
                "titre": "Reprendre là où je m'étais arrêté",
                "lignes": [
                  {
                    "module": "Construire une interface",
                    "cours": "Cours 1 : Les bases du HTML",
                    "etiquette": "HTML",
                    "progression": "2 / 3",
                    "prochaine": "La structure d'une page"
                  },
                  {
                    "module": "Développer une API",
                    "cours": "Cours 2 : Les routes HTTP",
                    "etiquette": "API REST",
                    "progression": "1 / 4",
                    "prochaine": "Définir une route"
                  }
                ]
              },
              "avancement": {
                "titre": "Mon avancement",
                "module": "Construire une interface",
                "valeur": "68 %"
              }
            }
          ]
        }
      }
    },
    "humeur": {
      "intro": {
        "h1": "Un point **sur son ressenti**",
        "lede": "L’apprenant règle chaque jour comment il se sent, avec un mot s’il le souhaite. L’équipe le voit."
      },
      "carte": {
        "entete": {
          "h3": "Comment vous sentez-vous aujourd'hui ?"
        },
        "mlvs": {
          "mlv": [
            {
              "aria": "Niveau 1"
            },
            {
              "aria": "Niveau 2"
            },
            {
              "aria": "Niveau 3"
            },
            {
              "aria": "Niveau 4"
            },
            {
              "aria": "Niveau 5"
            }
          ]
        },
        "pied": {
          "bouton": "Envoyer"
        },
        "toast": "Feedback envoyé !",
        "slider": {
          "aria": "Niveau de ressenti, de 1 à 5"
        },
        "commentaire": {
          "libelle": "Commentaire (facultatif)",
          "exemple": "Je bloque sur la dernière leçon."
        }
      }
    },
    "alerte": {
      "intro": {
        "h1": "Repérer **avant le décrochage**",
        "lede": "Un signal arrive en amont, avec les données qui l’expliquent."
      },
      "carte": {
        "entete": {
          "h3": "Alertes",
          "alr": "1 cas critique"
        },
        "alrow": {
          "b": "Promotion A",
          "span": "Risque de décrochage"
        },
        "sig": {
          "b": "Engagement en perte de vitesse",
          "p": "Plus de 15 jours sans activité et au plus deux jours de connexion sur la période."
        },
        "chart": {
          "leg": {
            "ok": {
              "texte": "Réussite"
            },
            "wr": {
              "texte": "Échec"
            },
            "ko": {
              "texte": "Abandon"
            },
            "small": "Probabilité estimée"
          },
          "axe": {
            "y": [
              "0 %",
              "25 %",
              "50 %",
              "75 %",
              "100 %"
            ],
            "x": [
              "6 oct.",
              "13 oct.",
              "20 oct.",
              "27 oct.",
              "3 nov.",
              "10 nov."
            ]
          },
          "callout": "Abandon : 56 %"
        },
        "used": {
          "p": [
            "Jours sans activité : 16 (seuil : 15)",
            "Jours de connexion : 2 (seuil : 2)"
          ]
        },
        "donnees": {
          "voir": "Voir les données utilisées",
          "masquer": "Masquer les données utilisées"
        }
      }
    },
    "retour": {
      "intro": {
        "h1": "L’équipe **juge l’analyse**",
        "lede": "Le formateur dit si l’analyse était pertinente, et ce que devient l’apprenant."
      },
      "carte": {
        "entete": {
          "h3": "Votre retour sur cette analyse"
        },
        "recap": {
          "span": "Promotion A",
          "b": "Engagement en perte de vitesse",
          "em": "Risque de décrochage"
        },
        "who": [
          "Choisir un avis",
          "Devenir de l’apprenant"
        ],
        "avis": {
          "av": [
            "Analyse pertinente",
            "Risque surestimé",
            "Risque sous-estimé",
            "Je ne peux pas encore me prononcer"
          ]
        },
        "chips": {
          "cchip": [
            "Réussite",
            "Échec",
            "Abandon",
            "Pas encore connu"
          ]
        },
        "pied": {
          "bouton": "Enregistrer le retour"
        },
        "toast": "Retour enregistré."
      }
    }
  },
  "closing": {
    "label": "Évolution de l'interface",
    "notes": "Six jalons choisis (premiers écrans, tableau de bord 2024, premier assistant, tableau de bord IA, ancien puis nouveau tableau de bord) : la date, la capture réelle de l'interface à cette date et ce qu'elle montre. Les autres captures sont gardées dans closing.json (clé _snapshotsRetirees). Les captures sont produites en reconstruisant chaque commit avec des données fictives (tools/snapshots). Ensuite le projet continue d'évoluer. Dernier écran : la page de connexion, comparée entre 2023 (visuel fixe) et 2026 (le fond est une photo tirée de l'API Unsplash à chaque visite). Les quatre photos affichées sont de vraies photos Unsplash (licence Unsplash) ; les captures sont produites par tools/snapshots/login.mjs.",
    "title": "L'interface au fil des mois",
    "captureManquante": "Capture à venir",
    "snapshots": [
      {
        "date": "28 juin 2023",
        "titre": "Les premiers écrans",
        "fonctions": [
          "Création d'un parcours",
          "Informations, dates et tags",
          "Ressources et contacts"
        ],
        "image": "assets/snapshots/2023-06-28-8204569.webp",
        "_commit": "8204569ef"
      },
      {
        "date": "5 mars 2024",
        "titre": "Le tableau de bord",
        "fonctions": [
          "Navigation latérale",
          "Statistiques et graphiques",
          ""
        ],
        "image": "assets/snapshots/2024-03-05-da283f2.webp",
        "_commit": "da283f2a2"
      },
      {
        "date": "8 septembre 2025",
        "titre": "Le premier assistant",
        "fonctions": [
          "Premier nom de l'assistant : « A.L.A.A. »",
          "Questions en langage naturel",
          ""
        ],
        "image": "assets/snapshots/2025-09-08-a1a615e.webp",
        "_commit": "a1a615ed9"
      },
      {
        "date": "5 mars 2026",
        "titre": "Le tableau de bord IA",
        "fonctions": [
          "Consommation de tokens",
          "Utilisation par promotion",
          ""
        ],
        "image": "assets/snapshots/2026-03-05-ef6724e.webp",
        "_commit": "ef6724e3c"
      },
      {
        "date": "5 mars 2026",
        "titre": "L'ancien tableau de bord",
        "fonctions": [
          "Actions rapides en boutons",
          "Tableau des derniers parcours",
          ""
        ],
        "image": "assets/snapshots/2026-03-05-ef6724e-tableau-de-bord.webp",
        "_commit": "ef6724e3c"
      },
      {
        "date": "15 octobre 2026",
        "titre": "Le nouveau tableau de bord",
        "fonctions": [
          "Derniers parcours et modules",
          "Actions rapides",
          ""
        ],
        "image": "assets/snapshots/2026-10-15-5708778.webp",
        "_commit": "57087787e"
      },
      {
        "date": "15 octobre 2026",
        "titre": "La page de connexion",
        "fonctions": [
          "Une photo Unsplash à chaque visite",
          "Thème clair ou sombre, photo adaptée",
          "Photo de secours si l'API est indisponible"
        ],
        "_commit": "57087787e"
      }
    ],
    "final": {
      "message": "Le projet continue d'évoluer",
      "demo": "Voir la démo",
      "adresse": "lxp.dev.step.eco"
    },
    "comparatif": {
      "debut": {
        "annee": "2023",
        "legende": "Un visuel fixe",
        "image": "assets/connexion/debut.webp",
        "alt": "Page de connexion de 2023 : formulaire sur fond uni, image décorative fixe"
      },
      "fin": {
        "annee": "2026",
        "legende": "Une photo Unsplash",
        "alt": "Page de connexion de 2026 : fond en tuiles tiré d'une photo Unsplash",
        "images": [
          "assets/connexion/fin-1.webp",
          "assets/connexion/fin-2.webp",
          "assets/connexion/fin-3.webp",
          "assets/connexion/fin-4.webp"
        ]
      },
      "requete": "abstract architecture minimal",
      "requeteLibelle": "Recherche Unsplash",
      "photos": [
        {
          "image": "assets/connexion/unsplash-1.webp",
          "alt": "Façade blanche, architecture minimale"
        },
        {
          "image": "assets/connexion/unsplash-2.webp",
          "alt": "Architecture abstraite en noir et blanc"
        },
        {
          "image": "assets/connexion/unsplash-3.webp",
          "alt": "Béton brutaliste et escaliers"
        },
        {
          "image": "assets/connexion/unsplash-4.webp",
          "alt": "Relief de béton géométrique"
        }
      ]
    },
    "_snapshotsRetirees": [
      {
        "date": "4 septembre 2023",
        "titre": "L'édition d'un parcours",
        "fonctions": [
          "Un parcours en cinq étapes",
          "Objectifs, compétences et modules",
          ""
        ],
        "image": "assets/snapshots/2023-09-04-dafd74e.webp",
        "_commit": "dafd74ef8"
      },
      {
        "date": "29 décembre 2023",
        "titre": "Le profil de l'utilisateur",
        "fonctions": [
          "Informations personnelles",
          "Calendrier, évaluations et badges",
          ""
        ],
        "image": "assets/snapshots/2023-12-29-5d400a3.webp",
        "_commit": "5d400a32f"
      },
      {
        "date": "27 septembre 2024",
        "titre": "La liste des groupes",
        "fonctions": [
          "Groupes d'apprenants",
          "Recherche et activation",
          ""
        ],
        "image": "assets/snapshots/2024-09-27-ac6b6f4.webp",
        "_commit": "ac6b6f46a"
      },
      {
        "date": "19 décembre 2024",
        "titre": "La médiathèque",
        "fonctions": [
          "Images, vidéos, audios, documents",
          "Taille et nombre d'utilisations",
          ""
        ],
        "image": "assets/snapshots/2024-12-19-e576c18.webp",
        "_commit": "e576c189f"
      },
      {
        "date": "24 avril 2025",
        "titre": "La liste des parcours",
        "fonctions": [
          "Tableau des parcours",
          "Recherche et filtre par formation",
          ""
        ],
        "image": "assets/snapshots/2025-04-24-d8027b1.webp",
        "_commit": "d8027b163"
      },
      {
        "date": "2 décembre 2025",
        "titre": "Le calendrier",
        "fonctions": [
          "Emploi du temps de la semaine",
          "Cours planifiés par module",
          ""
        ],
        "image": "assets/snapshots/2025-12-02-7d3d8fc.webp",
        "_commit": "7d3d8fc3b"
      },
      {
        "date": "15 octobre 2026",
        "titre": "La gestion des parcours",
        "fonctions": [
          "Formations et parcours en cartes",
          "Recherche d'un parcours",
          ""
        ],
        "image": "assets/snapshots/2026-10-15-5708778-parcours.webp",
        "_commit": "57087787e"
      },
      {
        "date": "15 octobre 2026",
        "titre": "La médiathèque",
        "fonctions": [
          "Images, vidéos, audios, fichiers",
          "Recherche et tri",
          ""
        ],
        "image": "assets/snapshots/2026-10-15-5708778-mediatheque.webp",
        "_commit": "57087787e"
      }
    ]
  },
  "content": {
    "label": "Créer ses propres cours",
    "notes": "Structure en six niveaux, puis éditeur riche et six types d'activité.",
    "levels": {
      "badge": "Créer du contenu",
      "title": "Un parcours, **six niveaux** de contenu",
      "lede": "De l'organisme de formation aux activités, chaque niveau s'emboîte dans le suivant.",
      "items": [
        "Organisme de formation",
        "Parcours",
        "Module",
        "Cours",
        "Leçon",
        "Activités"
      ],
      "levelBadge": "Niveau {0} sur {1}",
      "exampleLabel": "Exemple :",
      "details": [
        {
          "role": "L'organisation qui propose les formations.",
          "example": "Step"
        },
        {
          "role": "Un parcours regroupe des modules.",
          "example": "Développeur web 2026"
        },
        {
          "role": "Un module regroupe des cours.",
          "example": "Construire une interface"
        },
        {
          "role": "Un cours regroupe des leçons.",
          "example": "Les bases du HTML"
        },
        {
          "role": "Une leçon regroupe des activités.",
          "example": "La structure d'une page"
        },
        {
          "role": "Le contenu que suit l'apprenant : texte, image, vidéo, contenu interactif ou ressources.",
          "example": "Comprendre la structure HTML"
        }
      ]
    },
    "editor": {
      "title": "Un éditeur riche, **cinq types d'activité**",
      "types": [
        "Texte",
        "Image",
        "Vidéo",
        "Contenu interactif",
        "Ressources"
      ],
      "toolbar": [
        "Gras",
        "Italique",
        "Liste",
        "Liste de tâches",
        "Tableau",
        "Image",
        "Code"
      ],
      "titlePlaceholder": "Titre",
      "headings": [
        "",
        "Schéma d'une page HTML",
        "Comprendre la structure HTML",
        "Simulateur de mise en page",
        "Ressources du cours"
      ],
      "cancel": "Annuler",
      "text": {
        "title": "Construire sa première page",
        "paragraph": "Une page **bien structurée** rend le contenu accessible.",
        "checklist": [
          "Définir un titre",
          "Organiser les sections",
          "Ajouter des ressources"
        ],
        "tableHeaders": [
          "Section",
          "Rôle"
        ],
        "tableRows": [
          [
            "En-tête",
            "Titre et navigation"
          ],
          [
            "Principal",
            "Contenu de la page"
          ]
        ],
        "code": "<main>\n  <h1>Construire sa première page</h1>\n</main>"
      },
      "video": {
        "descriptionLabel": "Description",
        "description": "Les bases de la structure d'une page : en-tête, navigation et contenu principal.",
        "sourceLabel": "Sélectionner la provenance de la vidéo :",
        "source": "Un lien externe",
        "url": "https://exemple.fr/videos/structure-html",
        "previewTitle": "Aperçu de la vidéo",
        "time": "02:14 / 06:40"
      },
      "interactive": {
        "url": "https://exemple.fr/simulateur-mise-en-page",
        "clearAria": "Effacer l'URL",
        "urlEmpty": "Saisir une URL",
        "empty": "Saisir une URL ci-dessus pour prévisualiser le contenu."
      },
      "resources": {
        "title": "Ressources",
        "add": "Ajouter une ressource",
        "formats": "PDF, Office, texte ou Markdown",
        "removeAria": "Retirer la ressource",
        "items": [
          {
            "name": "Guide HTML accessible",
            "file": "guide-html-accessible.pdf",
            "size": "1,2 Mo"
          },
          {
            "name": "Fiche de synthèse",
            "file": "synthese-html.pdf",
            "size": "640 Ko"
          },
          {
            "name": "Exercices corrigés",
            "file": "exercices-html.docx",
            "size": "86 Ko"
          }
        ],
        "added": [
          {
            "name": "Lien vers le cours",
            "file": "cours-html.md",
            "size": "12 Ko"
          },
          {
            "name": "Schéma de la page",
            "file": "schema-page.pptx",
            "size": "420 Ko"
          },
          {
            "name": "Glossaire",
            "file": "glossaire-web.pdf",
            "size": "210 Ko"
          }
        ]
      }
    }
  },
  "frise": {
    "label": "Frise du projet",
    "notes": "La première phase, financée par la Région, a validé la faisabilité. La deuxième, cofinancée par le FSE, a produit la plateforme actuelle. Cliquer un jalon ouvre sa scène.",
    "start": {
      "label": "Projet LXP",
      "aria": "Dérouler la frise du projet"
    },
    "phases": [
      {
        "title": "Phase 1",
        "subtitle": "Région Nouvelle-Aquitaine"
      },
      {
        "title": "Phase 2",
        "subtitle": "Cofinancée par le FSE"
      }
    ],
    "ticks": [
      "2023",
      "2024",
      "2025",
      "2026"
    ],
    "end": "Novembre 2026",
    "steps": [
      {
        "period": "Juin 2022 – février 2024",
        "title": "Prototype et fondations"
      },
      {
        "period": "",
        "title": "Créer ses propres cours"
      },
      {
        "period": "",
        "title": "Un assistant 24 h/24"
      },
      {
        "period": "",
        "title": "Vérifier ce qui est acquis"
      },
      {
        "period": "",
        "title": "Tout organiser au même endroit"
      },
      {
        "period": "",
        "title": "Accompagner chaque apprenant"
      },
      {
        "period": "",
        "title": "Piloter usages et contenus"
      },
      {
        "period": "",
        "title": "À l'image de l'organisme"
      }
    ]
  },
  "intro": {
    "label": "Introduction",
    "notes": "Bienvenue. ANDRIA est la plateforme d'apprentissage que Step a conçue entre 2022 et 2026, avec le soutien de la Région Nouvelle-Aquitaine et de l'Union européenne."
  },
  "organize": {
    "label": "Tout organiser au même endroit",
    "notes": "Calendrier par parcours (cours, devoirs, modules) ; médiathèque (images, vidéos, audios, ressources) ; groupes rattachés à un parcours et à ses formateurs ; tags. Données fictives.",
    "calendrier": {
      "intro": {
        "h1": "Un calendrier **par parcours**",
        "lede": "Consultez les cours, les devoirs et les modules d’un parcours."
      },
      "carte": {
        "entete": {
          "h3": "Octobre 2026",
          "lgs": {
            "lg": [
              {
                "texte": "Cours"
              },
              {
                "texte": "Devoir"
              },
              {
                "texte": "Module"
              }
            ]
          }
        },
        "wk": {
          "span": [
            "Lun",
            "Mar",
            "Mer",
            "Jeu",
            "Ven",
            "Sam",
            "Dim"
          ]
        },
        "grid": {
          "day": [
            {
              "ev": "Bases du HTML",
              "ev-type": "Cours",
              "ev-titre": "Les bases du HTML",
              "ev-date": "Mardi 6 octobre"
            },
            {
              "ev": "Page d'accueil",
              "ev-type": "Devoir",
              "ev-titre": "Devoir : page d'accueil",
              "ev-date": "Jeudi 8 octobre"
            },
            {
              "ev": "Interface",
              "ev-type": "Module",
              "ev-titre": "Module : Construire une interface",
              "ev-date": "Mardi 13 octobre"
            },
            {
              "ev": "Les balises",
              "ev-type": "Cours",
              "ev-titre": "Les balises principales",
              "ev-date": "Jeudi 15 octobre"
            },
            {
              "ev": "Mise en page",
              "ev-type": "Cours",
              "ev-date": "Mardi 20 octobre"
            },
            {
              "ev": "Maquette",
              "ev-type": "Devoir",
              "ev-titre": "Devoir : maquette de la page",
              "ev-date": "Jeudi 22 octobre"
            },
            {
              "ev": "Accessibilité",
              "ev-type": "Module",
              "ev-titre": "Module : Accessibilité",
              "ev-date": "Mardi 27 octobre"
            }
          ]
        }
      }
    },
    "mediatheque": {
      "intro": {
        "h1": "Tous les médias **au même endroit**",
        "lede": "Gérez toutes les ressources utilisées dans l’application."
      },
      "carte": {
        "mtabs": {
          "tab": [
            "Images",
            "Vidéos",
            "Audios",
            "Ressources"
          ]
        },
        "sorts": {
          "span": "Trier par",
          "sort": [
            "Date de création",
            "Taille",
            "Nombre d'utilisations"
          ]
        },
        "mhead": {
          "span": [
            "Nom du fichier",
            "Taille",
            "Utilisé"
          ]
        },
        "mbody": {
          "mlist": [
            {
              "mrow2": [
                {
                  "mn": "logo-organisme.png",
                  "span": [
                    "124 Ko"
                  ]
                },
                {
                  "mn": "banniere-parcours.jpg",
                  "span": [
                    "860 Ko"
                  ]
                },
                {
                  "mn": "schema-html.svg",
                  "span": [
                    "18 Ko"
                  ]
                },
                {
                  "mn": "photo-equipe.webp",
                  "span": [
                    "312 Ko"
                  ]
                },
                {
                  "mn": "capture-editeur.png",
                  "span": [
                    "540 Ko"
                  ]
                }
              ]
            },
            {
              "mrow2": [
                {
                  "mn": "intro-html.mp4",
                  "span": [
                    "47,1 Mo"
                  ]
                },
                {
                  "mn": "presentation-parcours.mp4",
                  "span": [
                    "94,2 Mo"
                  ]
                },
                {
                  "mn": "demo-editeur.webm",
                  "span": [
                    "21,9 Mo"
                  ]
                },
                {
                  "mn": "accueil-promo.mp4",
                  "span": [
                    "31,1 Mo"
                  ]
                },
                {
                  "mn": "tutoriel-quiz.mp4",
                  "span": [
                    "26,9 Mo"
                  ]
                }
              ]
            },
            {
              "mrow2": [
                {
                  "mn": "podcast-accueil.mp3",
                  "span": [
                    "9,2 Mo"
                  ]
                },
                {
                  "mn": "consignes-devoir.m4a",
                  "span": [
                    "2,1 Mo"
                  ]
                },
                {
                  "mn": "lecture-lecon.mp3",
                  "span": [
                    "5,5 Mo"
                  ]
                },
                {
                  "mn": "extrait-entretien.wav",
                  "span": [
                    "14,5 Mo"
                  ]
                },
                {
                  "mn": "bienvenue.mp3",
                  "span": [
                    "1,8 Mo"
                  ]
                }
              ]
            },
            {
              "mrow2": [
                {
                  "mn": "guide-apprenant.pdf",
                  "span": [
                    "1,4 Mo"
                  ]
                },
                {
                  "mn": "grille-evaluation.xlsx",
                  "span": [
                    "96 Ko"
                  ]
                },
                {
                  "mn": "support-module.pptx",
                  "span": [
                    "5,1 Mo"
                  ]
                },
                {
                  "mn": "glossaire.docx",
                  "span": [
                    "74 Ko"
                  ]
                },
                {
                  "mn": "modele-devoir.docx",
                  "span": [
                    "58 Ko"
                  ]
                }
              ]
            }
          ]
        }
      }
    },
    "groupes": {
      "intro": {
        "h1": "Des groupes **rattachés à un parcours**",
        "lede": "Chaque groupe est lié à un parcours et aux formateurs qui l’accompagnent."
      },
      "carte": {
        "entete": {
          "h3": "Groupes"
        },
        "ghead": {
          "span": [
            "Nom",
            "Formation - Parcours",
            "Nombre d’apprenants"
          ]
        },
        "grow": [
          {
            "formateurs": "Formateur A, Formateur B",
            "nom": "Promotion A",
            "parcours": "Développeur web 2026",
            "span": [
              "Promotion A",
              "Développeur web - Parcours 2026"
            ]
          },
          {
            "formateurs": "Formateur C",
            "nom": "Promotion B",
            "parcours": "Initiation au numérique",
            "span": [
              "Promotion B",
              "Initiation - Parcours numérique"
            ]
          },
          {
            "formateurs": "Formateur A",
            "nom": "Atelier du soir",
            "parcours": "Accessibilité du web",
            "span": [
              "Atelier du soir",
              "Accessibilité - Parcours web"
            ]
          }
        ],
        "ginfo": {
          "h4": "Informations du groupe",
          "p": [
            {
              "small": "Parcours associé",
              "gp": "Développeur web 2026"
            },
            {
              "small": "Formateurs"
            }
          ],
          "em": "Les affectations des formateurs se modifient depuis le parcours associé."
        }
      }
    },
    "tags": {
      "intro": {
        "h1": "Des tags pour **classer les contenus**",
        "lede": "Créer, modifier et supprimer des tags."
      },
      "carte": {
        "entete": {
          "h3": "Liste des tags",
          "bouton": "Ajouter un tag"
        },
        "thead": {
          "span": [
            "Titre",
            "No. d'utilisation",
            "Parcours"
          ]
        },
        "tbody": {
          "trow": [
            {
              "tt": {
                "texte": "numérique"
              },
              "span": [
                "Développeur web 2026"
              ]
            },
            {
              "tt": {
                "texte": "accessibilité"
              },
              "span": [
                "Accessibilité du web"
              ]
            },
            {
              "tt": {
                "texte": "design"
              },
              "span": [
                "Initiation au numérique"
              ]
            }
          ]
        },
        "thint": "Exemple : artisanal, technologie, industriel",
        "suggestions": [
          {
            "nom": "technologie",
            "usage": "5",
            "parcours": "Développeur web 2026"
          },
          {
            "nom": "industriel",
            "usage": "2",
            "parcours": "Initiation au numérique"
          },
          {
            "nom": "artisanal",
            "usage": "1",
            "parcours": "Accessibilité du web"
          }
        ],
        "supprimer": "Supprimer"
      }
    }
  },
  "personalize": {
    "label": "À l'image de l'organisme",
    "notes": "Thèmes clairs et sombres au choix de l'organisme ; identité (nom, logo) ; modèles d'e-mails ; félicitations, badges de compétences et historique d'accomplissements. Données fictives.",
    "themes": {
      "intro": {
        "h1": "Une interface **à vos couleurs**",
        "lede": "Chaque organisme choisit les thèmes accessibles à tous ses utilisateurs."
      },
      "carte": {
        "entete": {
          "h3": "Personnalisation de l'interface"
        },
        "description": "Choisissez les thèmes accessibles à tous les utilisateurs de l'instance.",
        "groupes": [
          {
            "titre": "Thèmes clairs",
            "actifs": "4 actifs",
            "themes": [
              "Classique",
              "Océan",
              "Lin",
              "Forêt"
            ]
          },
          {
            "titre": "Thèmes sombres",
            "actifs": "4 actifs",
            "themes": [
              "Classique sombre",
              "Aurore",
              "Braise",
              "Abysses"
            ]
          }
        ],
        "apercu": {
          "salutation": "Bonjour Camille !",
          "bouton": "Mon avancement",
          "tuiles": [
            {
              "titre": "Calendrier",
              "texte": "Votre prochaine séance : Atelier CSS."
            },
            {
              "titre": "Remises et évaluations",
              "texte": "Votre retour pédagogique est disponible."
            }
          ]
        }
      }
    },
    "identite": {
      "intro": {
        "h1": "Le **nom et le logo** de l'organisme",
        "lede": "La plateforme prend le nom et le logo de l'organisme de formation qui l'utilise."
      },
      "carte": {
        "entete": {
          "h3": "Identité de l'organisme"
        },
        "description": "Personnalisez le nom, le logo et son fond d'affichage.",
        "champs": {
          "nom": {
            "libelle": "Nom de l'organisme",
            "valeur": "Step"
          },
          "site": {
            "libelle": "Site internet",
            "optionnel": "(optionnel)",
            "valeur": "https://step.eco"
          },
          "logo": {
            "libelle": "Logo",
            "optionnel": "(facultatif)",
            "aide": "JPG ou PNG, 500 Ko maximum."
          }
        },
        "bouton": "Sauvegarder",
        "confirmation": "Identité enregistrée."
      }
    },
    "emails": {
      "intro": {
        "h1": "Des **e-mails à votre image**",
        "lede": "Un modèle au choix pour les messages envoyés aux utilisateurs."
      },
      "carte": {
        "entete": {
          "h3": "Template de l'e-mail"
        },
        "selection": "Modèle sélectionné :",
        "modeles": [
          "Classique",
          "En-tête compact",
          "Éditorial",
          "Invitation",
          "Bannière",
          "Épuré"
        ],
        "apercu": {
          "objet": "Bienvenue sur la plateforme",
          "texte": "Bonjour Camille, votre compte est prêt. Vous pouvez dès maintenant accéder à votre parcours.",
          "bouton": "Accéder à la plateforme"
        },
        "actions": {
          "test": "Envoyer un e-mail de test"
        },
        "confirmation": "E-mail de test envoyé."
      }
    },
    "felicitations": {
      "intro": {
        "h1": "Célébrer **chaque étape** franchie",
        "lede": "Les modules terminés et les compétences acquises sont reconnus à l'apprenant."
      },
      "carte": {
        "entete": {
          "h3": "Fin de module"
        },
        "message": "Félicitations, vous avez terminé tous les cours de ce module !",
        "obtenus": {
          "titre": "Badges obtenus",
          "badges": [
            "Communiquer efficacement",
            "Structurer une page web"
          ]
        },
        "restants": {
          "titre": "Badges restant à obtenir",
          "badges": [
            "Concevoir une interface accessible"
          ]
        },
        "historique": {
          "titre": "Mon historique d'accomplissements",
          "description": "Retrouvez les étapes que vous avez validées au fil de vos cours.",
          "items": [
            {
              "cours": "Les bases du HTML",
              "date": "6 octobre 2026"
            },
            {
              "cours": "Les balises principales",
              "date": "15 octobre 2026"
            },
            {
              "cours": "Mise en page",
              "date": "20 octobre 2026"
            }
          ]
        }
      }
    }
  },
  "proto": {
    "label": "Un prototype pour valider l'idée",
    "notes": "Phase 1 : analyse du marché, personas, prototype, bases techniques ; faisabilité validée.",
    "prototype": {
      "badge": "Phase 1 - juin 2022 – février 2024",
      "title": "Un prototype pour **valider l'idée**",
      "lede": "Analyser le marché, écouter les utilisateurs, puis construire.",
      "railStart": "Juin 2022",
      "railEnd": "Février 2024",
      "cards": [
        {
          "title": "Analyse concurrentielle",
          "subtitle": "Le marché des LXP et des LMS",
          "points": [
            "Analyse approfondie du marché des LXP et des LMS",
            "Décision : concevoir une LXP plutôt que de rester sur un LMS classique (type Moodle)"
          ]
        },
        {
          "title": "Personas et besoins",
          "subtitle": "Entretiens apprenants et formateurs",
          "points": [
            "Personas d'utilisateurs construits à partir d'entretiens",
            "Besoins fonctionnels définis avec les apprenants et les formateurs"
          ]
        },
        {
          "title": "Premier prototype",
          "subtitle": "Développé et déployé",
          "points": [
            "Prototype fonctionnel de la plateforme LXP",
            "Faisabilité validée, potentiel démontré"
          ]
        }
      ]
    },
    "architecture": {
      "title": "Une architecture **pour durer**",
      "hint": {
        "title": "Cliquez sur une couche",
        "text": "Interface, API, données, livraison : chaque couche pose les bases de la plateforme."
      },
      "layers": [
        {
          "name": "Livraison - CI/CD",
          "detail": "Chaîne d'intégration et de déploiement continus (CI/CD), avec Jenkins pour l'automatisation et Infisical pour la gestion des secrets"
        },
        {
          "name": "Données - PostgreSQL et MongoDB",
          "detail": "Bases de données PostgreSQL et MongoDB"
        },
        {
          "name": "API - Node.js / Express",
          "detail": "Architecture Node.js / Express"
        },
        {
          "name": "Interface - React",
          "detail": "Frontend React"
        },
        {
          "name": "Exploration - IA",
          "detail": "Travaux exploratoires sur l'intégration de l'IA"
        }
      ]
    },
    "validation": {
      "title": "Faisabilité **validée**",
      "lede": "Ce prototype a démontré le potentiel de la solution.",
      "gains": [
        {
          "title": "Marché analysé",
          "text": "Une LXP plutôt qu'un LMS classique"
        },
        {
          "title": "Besoins recueillis",
          "text": "Auprès d'apprenants et de formateurs"
        },
        {
          "title": "Prototype déployé",
          "text": "Fonctionnel, potentiel démontré"
        }
      ],
      "railLeft": "Fin de la phase 1 - février 2024",
      "railRight": "Phase 2 - 2024 – 2026",
      "next": "Une plateforme **robuste**, **évolutive** et intégrant des modules d'**intelligence artificielle**."
    }
  },
  "setup": {
    "label": "Mettre en place ANDRIA",
    "notes": "Avant la clôture : ce qu'il faut pour mettre ANDRIA en place, en termes simples. Trois faits tirés du dépôt du LXP : s'installe sur un serveur avec sauvegardes, IA séparée et désactivable, import Moodle. Le détail technique (conteneurs, bases, fournisseur d'IA) reste en réserve pour les questions. Volontairement absents : licence, hébergement des données, SSO, SCORM, tarif, contact (rien dans le dépôt).",
    "title": "Mettre en place **ANDRIA**",
    "lede": "Ce qu'il faut savoir pour démarrer.",
    "cards": [
      {
        "role": "Hébergement",
        "title": "On héberge et configure ANDRIA pour vous",
        "text": "Serveur, sauvegardes automatiques des bases et des fichiers, stockage S3… l'équipe du studio s'occupe de tout."
      },
      {
        "role": "Intelligence artificielle",
        "title": "Une IA facultative",
        "text": "L'assistant, les quiz et les alertes de décrochage s'appuient sur un service d'IA séparé. Il peut être désactivé."
      },
      {
        "role": "Contenus existants",
        "title": "Reprendre ce qui existe",
        "text": "Vos cours Moodle et vos parcours déjà construits peuvent être importés."
      }
    ]
  },
  "start": {
    "label": "Départ",
    "notes": "Écran d'attente : n'importe quelle touche lance la présentation.",
    "message": "Appuyer sur n'importe quelle touche pour lancer la présentation"
  },
  "steer": {
    "label": "Piloter usages et contenus",
    "notes": "Consommation de l'IA par promotion, classement des cours, import de cours Moodle et de parcours, tableaux de bord selon le rôle. Données fictives.",
    "ia": {
      "intro": {
        "h1": "Savoir **ce que consomme l'IA**",
        "lede": "La consommation d'IA ce mois-ci, par promotion et par utilisateur, mesurée en « tokens » (l'unité de calcul de l'IA)."
      },
      "carte": {
        "entete": {
          "h3": "Tableau de bord IA"
        },
        "total": {
          "libelle": "Tokens consommés ce mois-ci",
          "valeur": "128 400"
        },
        "promotions": {
          "titre": "Utilisation des tokens par promotions ce mois-ci",
          "items": [
            {
              "nom": "Développeur web 2026",
              "valeur": "76 800",
              "part": 60
            },
            {
              "nom": "Designer numérique 2026",
              "valeur": "51 600",
              "part": 40
            }
          ]
        },
        "top": {
          "titre": "Top consommateurs de tokens (5 premiers)",
          "colonnes": [
            "Utilisateur",
            "Tokens"
          ],
          "lignes": [
            {
              "nom": "Camille",
              "valeur": "18 400"
            },
            {
              "nom": "Louis",
              "valeur": "15 200"
            },
            {
              "nom": "Inès",
              "valeur": "12 900"
            },
            {
              "nom": "Hugo",
              "valeur": "11 300"
            },
            {
              "nom": "Léa",
              "valeur": "9 800"
            }
          ]
        }
      }
    },
    "classement": {
      "intro": {
        "h1": "Voir **les cours les mieux notés**",
        "lede": "Les retours des apprenants classent les cours de chaque formateur."
      },
      "carte": {
        "entete": {
          "h3": "Classement de mes cours"
        },
        "sousTitre": "Retours des apprenants",
        "cours": [
          {
            "titre": "Les bases du HTML",
            "note": "4,8"
          },
          {
            "titre": "Concevoir une page accessible",
            "note": "4,6"
          },
          {
            "titre": "Mettre en page avec CSS",
            "note": "4,4"
          },
          {
            "titre": "Les formulaires",
            "note": "4,1"
          },
          {
            "titre": "Publier son site",
            "note": "3,9"
          }
        ],
        "noteSur": "/ 5",
        "plus": "Afficher plus",
        "moins": "Afficher moins"
      }
    },
    "import": {
      "intro": {
        "h1": "Importer **sans tout recréer**",
        "lede": "Des cours Moodle et des parcours déjà construits entrent dans la plateforme."
      },
      "carte": {
        "entete": {
          "h3": "Réutiliser les contenus existants"
        },
        "options": [
          {
            "titre": "Import de cours",
            "description": "Importer des cours depuis Moodle ainsi que toutes les leçons et activités associées.",
            "bouton": "Importer des cours",
            "encours": "Import en cours…",
            "termine": "Cours importés avec leurs leçons et activités."
          },
          {
            "titre": "Importer un parcours",
            "description": "Retrouver une structure pédagogique déjà construite.",
            "bouton": "Importer le parcours",
            "encours": "Import en cours…",
            "termine": "Parcours importé avec ses modules."
          }
        ]
      }
    },
    "roles": {
      "intro": {
        "h1": "Un tableau de bord **pour chacun**",
        "lede": "Chaque rôle retrouve les actions et les informations qui le concernent : la navigation et les cartes changent."
      },
      "carte": {
        "entete": {
          "h3": "Tableaux de bord"
        },
        "onglets": [
          {
            "nom": "Apprenant",
            "espace": "Espace apprenant",
            "nav": [
              "Accueil",
              "Parcours",
              "Calendrier",
              "Remises & évaluations",
              "Ressources supplémentaires"
            ],
            "salutation": "Bonjour Camille",
            "sous": "Retrouvez votre formation et votre prochaine activité.",
            "cartes": [
              {
                "titre": "Reprendre mon apprentissage",
                "lignes": [
                  {
                    "t": "Construire une interface",
                    "s": "La structure d'une page"
                  }
                ],
                "pastille": "2 / 3"
              },
              {
                "titre": "Ma prochaine séance",
                "lignes": [
                  {
                    "t": "Atelier CSS",
                    "s": "Demain à 14 h"
                  }
                ]
              },
              {
                "titre": "Mes parcours",
                "lignes": [
                  {
                    "t": "Développeur web",
                    "s": "3 modules à explorer"
                  },
                  {
                    "t": "Les bases du HTML",
                    "s": "Votre dernière activité"
                  }
                ]
              },
              {
                "titre": "Mes accomplissements",
                "lignes": [
                  {
                    "t": "Vos compétences se construisent.",
                    "s": ""
                  }
                ],
                "badges": [
                  "HTML",
                  "CSS"
                ]
              }
            ]
          },
          {
            "nom": "Équipe pédagogique",
            "espace": "Équipe pédagogique",
            "nav": [
              "Accueil",
              "Utilisateurs",
              "Groupes",
              "Parcours",
              "Modules",
              "Cours",
              "Calendrier",
              "Évaluations"
            ],
            "salutation": "Votre tableau de bord",
            "sous": "Organiser les contenus et accompagner les apprenants.",
            "cartes": [
              {
                "titre": "Actions recommandées",
                "lignes": [
                  {
                    "t": "Répondre à Camille",
                    "s": "Un feedback attend votre retour."
                  },
                  {
                    "t": "Préparer votre prochain cours",
                    "s": "Retrouver les contenus à publier"
                  }
                ]
              },
              {
                "titre": "Alertes du groupe",
                "lignes": [
                  {
                    "t": "1 cas critique",
                    "s": "Développeur web 2026"
                  }
                ]
              },
              {
                "titre": "Derniers parcours",
                "lignes": [
                  {
                    "t": "Métiers du numérique",
                    "s": "Développeur web"
                  },
                  {
                    "t": "Construire une interface",
                    "s": "Retrouver les derniers modules"
                  }
                ]
              },
              {
                "titre": "Retours des apprenants",
                "lignes": [
                  {
                    "t": "« Je bloque sur la dernière leçon. »",
                    "s": "Camille Martin"
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  "traits": {
    "label": "Caractéristiques",
    "notes": "Neuf caractéristiques sous forme de tuiles : survol ou clic pour les détails. Le chevron suffit pour avancer.",
    "title": "Ce que fait ANDRIA",
    "tiles": [
      {
        "title": "Personnalisation",
        "text": "Chacun adapte son apprentissage à ses intérêts et à ses objectifs."
      },
      {
        "title": "Reprendre là où l'on s'était arrêté",
        "text": "L'apprenant retrouve sa dernière leçon et la reprend en un clic."
      },
      {
        "title": "Interactivité",
        "text": "Échanger avec le contenu et avec les autres, poser des questions."
      },
      {
        "title": "Suivi",
        "text": "Suivre ses progrès et se fixer des objectifs d'apprentissage à atteindre."
      },
      {
        "title": "Intégration de contenu",
        "text": "Cours en ligne, autres plateformes (Moodle), articles, vidéos."
      },
      {
        "title": "Analyse",
        "text": "Comprendre les forces et les faiblesses, pour les apprenants comme pour les administrateurs."
      },
      {
        "title": "Certification",
        "text": "Démontrer ses compétences et son expertise dans un domaine."
      },
      {
        "title": "Gestion de contenu",
        "text": "Créer, publier et mettre à jour les contenus d'apprentissage."
      },
      {
        "title": "Assistant virtuel ANDRIA",
        "text": "Un assistant IA disponible 24 h/24 et 7 j/7 pour aider et recommander."
      }
    ]
  },
  "what": {
    "label": "ANDRIA",
    "notes": "Trois temps : ce qu'est ANDRIA, le problème résolu et les objectifs, puis la comparaison LMS / LXP. Une interaction par temps.",
    "definition": {
      "title": "Une **plateforme d'expérience** d'apprentissage",
      "acronym": [
        "**L**earning",
        "e**X**perience",
        "**P**latform"
      ],
      "lede": "Des contenus et des modalités de formation adaptés aux besoins, aux envies et au profil de chacun, pour développer ses compétences en restant motivé et engagé.",
      "plates": [
        "L'apprenant",
        "Ses besoins",
        "Ses envies",
        "Son profil"
      ]
    },
    "sidebar": {
      "aria": "Difficultés et objectifs",
      "items": [
        "Individualiser",
        "Décrochage",
        "Autonomie",
        "Les objectifs"
      ]
    },
    "problems": [
      {
        "title": "Individualiser les parcours",
        "text": "Les outils LMS existants sont centrés sur les contenus plutôt que sur l'apprenant."
      },
      {
        "title": "Prévenir le décrochage",
        "text": "Les publics fragilisés décrochent davantage en formation à distance."
      },
      {
        "title": "Gagner en autonomie",
        "text": "Les apprenants attendent plus d'autonomie que ce que les outils disponibles leur offrent."
      }
    ],
    "goals": {
      "families": [
        {
          "title": "Apprendre",
          "items": [
            "Efficacité de l'apprentissage",
            "Apprentissage continu et autonomie",
            "Gestion des compétences"
          ]
        },
        {
          "title": "S'engager",
          "items": [
            "Engagement des utilisateurs",
            "Satisfaction",
            "Adoption de la plateforme"
          ]
        },
        {
          "title": "Accompagner",
          "items": [
            "Suivi et remédiation ciblée",
            "Prévention du décrochage",
            "Parcours individualisés et motivation"
          ]
        }
      ]
    },
    "compare": {
      "title": "LMS ou LXP ?",
      "lms": {
        "name": "LMS",
        "fullName": "Learning Management System"
      },
      "lxp": {
        "name": "LXP",
        "fullName": "Learning Experience Platform"
      },
      "rows": [
        {
          "lms": "Centré sur les contenus",
          "lxp": "Centré sur l'utilisateur"
        },
        {
          "lms": "Contenus complets et détaillés",
          "lxp": "Accessible et ergonomique"
        },
        {
          "lms": "Structuration rigide des savoirs",
          "lxp": "Recommandations de contenus et d'activités"
        },
        {
          "lms": "Nécessite des capacités organisationnelles",
          "lxp": "Dimension sociale et participative"
        },
        {
          "lms": "Pas d'individualisation automatique",
          "lxp": "Individualisation des parcours"
        }
      ],
      "conclusion": "Plutôt que de connecter des outils disparates pour collecter de la donnée, **créer le contenant qui produit les données à analyser**."
    }
  },
  "who": {
    "label": "Pour qui, pour quoi",
    "notes": "Après la définition et le comparatif LMS / LXP : à qui sert ANDRIA et ce que chacun y gagne. Trois profils, un bénéfice chacun, tous tirés de la documentation du projet (objectifs 1 à 9). Aucun chiffre ni résultat n'est affiché : la présentation ne revendique pas d'amélioration mesurée. Les cartes se posent d'elles-mêmes, un seul clic pour continuer.",
    "title": "Pour **qui** ? Pour **quoi** ?",
    "lede": "Conçue par un organisme de formation pour la formation à distance, notamment auprès de publics fragilisés. Trois profils y trouvent leur place.",
    "roles": [
      {
        "role": "L'apprenant",
        "title": "Apprendre à son rythme",
        "text": "Des contenus et des modalités adaptés à ses besoins, ses envies et son profil, avec un assistant disponible 24 h/24."
      },
      {
        "role": "Le formateur",
        "title": "Repérer avant le décrochage",
        "text": "Des signaux d'alerte précoces et des outils d'analyse pour proposer une remédiation ciblée."
      },
      {
        "role": "L'organisme de formation",
        "title": "Garder la main sur ses formations",
        "text": "Créer, publier et mettre à jour les contenus, reprendre ceux de Moodle, analyser les données que la plateforme produit."
      }
    ]
  }
};
