const API_URL = "/api/students";


/* =========================
   CHARGER LES ÉTUDIANTS
========================= */

async function loadStudents() {

    const table = document.getElementById("studentTable");

    table.innerHTML = `
        <tr>
            <td colspan="4" class="loading">
                Chargement...
            </td>
        </tr>
    `;

    try {

        const response =
            await fetch(`${API_URL}/list`);

        if (!response.ok) {

            throw new Error("Erreur serveur");

        }

        const students =
            await response.json();


        document.getElementById("totalStudents")
            .textContent = students.length;


        table.innerHTML = "";


        if (students.length === 0) {

            table.innerHTML = `
                <tr>
                    <td colspan="4" class="loading">
                        Aucun étudiant trouvé.
                    </td>
                </tr>
            `;

            return;
        }


        students.forEach(student => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${student.id ?? "-"}
                </td>

                <td>
                    ${student.nom ?? "-"}
                </td>

                <td>
                    ${student.prenom ?? "-"}
                </td>

                <td>

                    <button
                        onclick="deleteStudent(${student.id})"
                        style="
                            border:none;
                            background:#ef4444;
                            color:white;
                            padding:8px 12px;
                            border-radius:7px;
                            cursor:pointer;
                        ">

                        Supprimer

                    </button>

                </td>
            `;


            table.appendChild(row);

        });


    } catch (error) {

        console.error(error);


        table.innerHTML = `
            <tr>
                <td colspan="4" class="loading">
                    ❌ Impossible de contacter le serveur.
                </td>
            </tr>
        `;

    }

}


/* =========================
   OUVRIR LE FORMULAIRE
========================= */

function openForm() {

    document.getElementById("modal")
        .style.display = "flex";

}


/* =========================
   FERMER LE FORMULAIRE
========================= */

function closeForm() {

    document.getElementById("modal")
        .style.display = "none";

}


/* =========================
   AJOUTER UN ÉTUDIANT
========================= */

async function addStudent(event) {

    event.preventDefault();


    const nom =
        document.getElementById("name").value;


    const prenom =
        document.getElementById("prenom").value;


    const student = {

        nom: nom,

        prenom: prenom

    };


    try {

        const response =
            await fetch(
                `${API_URL}/create`,
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(student)

                }
            );


        if (!response.ok) {

            throw new Error(
                "Erreur lors de l'ajout"
            );

        }


        alert(
            "✅ Étudiant ajouté avec succès !"
        );


        document.getElementById("name")
            .value = "";


        document.getElementById("prenom")
            .value = "";


        closeForm();


        loadStudents();


    } catch (error) {

        console.error(error);


        alert(
            "❌ Impossible d'ajouter l'étudiant."
        );

    }

}


/* =========================
   SUPPRIMER UN ÉTUDIANT
========================= */

async function deleteStudent(id) {

    if (
        !confirm(
            "Voulez-vous vraiment supprimer cet étudiant ?"
        )
    ) {

        return;

    }


    try {

        const response =
            await fetch(
                `${API_URL}/delete?id=${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Erreur lors de la suppression"
            );

        }


        alert(
            "✅ Étudiant supprimé !"
        );


        loadStudents();


    } catch (error) {

        console.error(error);


        alert(
            "❌ Impossible de supprimer l'étudiant."
        );

    }

}


/* =========================
   LANCER AU CHARGEMENT
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadStudents();

    }
);