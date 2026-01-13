#!/bin/bash
cd ~/JobHawk/backend && npm run dev &
sleep 3
cd ~/JobHawk/frontend && npm start &
wait
