#!/bin/bash

# Lancer PocketBase en arrière-plan
if [ -f ./pocketbase ]; then
  ./pocketbase serve > pb.log 2>&1 &
  PB_PID=$!
  echo "PocketBase lancé (PID $PB_PID) sur http://127.0.0.1:8090"
else
  echo "ERREUR : Le binaire pocketbase n'est pas présent dans le dossier courant."
  exit 1
fi

# Lancer le front Angular
npm install
npm start

# Arrêter PocketBase à la fin si le script est interrompu
trap "kill $PB_PID" EXIT
