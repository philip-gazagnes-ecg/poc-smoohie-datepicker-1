<template>
  <div class="">
    <h1 class="text-2xl font-bold">
      POC Datepicker
    </h1>
    <table class="w-full">
      <tr>
        <th class="w-1/3">
          Feature
        </th>
        <th class="w-1/3">
          Vue 3 datepicker
        </th>
        <th class="w-1/3">
          Vcalendar
        </th>
      </tr>
      <tr>
        <td>Pas de range séletionné, affichage du mois en cours</td>
        <td />
        <td>Oui</td>
      </tr>
      <tr>
        <td>Pas de range sélectionné, affichage d'un mois dans le futur</td>
        <td />
        <td>Oui</td>
      </tr>
      <tr>
        <td>Restriction de la période sélectionnable (min / max date)</td>
        <td />
        <td>Oui</td>
      </tr>
      <tr>
        <td>Idem, mise à jour en fonction du start date</td>
        <td />
        <td>Oui</td>
      </tr>
      <tr>
        <td>Empêcher des jours d'être sélectionnés</td>
        <td />
        <td>Oui, mais pas nativement : le fonctionnement natif ne permet pas de sélectionner un range comprenant des disabled dates. Astuce : appliquer un pointer-events: none; en ciblant les élément via leur class .id-2022-12-15...</td>
      </tr>
      <tr>
        <td>Idem, mise à jour en fonction du start date</td>
        <td />
        <td>Oui, avec le même principe</td>
      </tr>
      <tr>
        <td>Affichage desktop horizontal 2 mois</td>
        <td />
        <td />
      </tr>
      <tr>
        <td>Affichage mobile vertical tous les mois chargés (test 18 mois)</td>
        <td />
        <td>Oui, ça semble plutôt fluide</td>
      </tr>
      <tr>
        <td>Passer une locale, traductions</td>
        <td />
        <td />
      </tr>
    </table>
  </div>
</template>
