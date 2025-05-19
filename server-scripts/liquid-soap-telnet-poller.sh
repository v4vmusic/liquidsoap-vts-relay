while true
do
  json=$(echo "Sir_Libres_Liberty_Stream.metadata" | 
  timeout .25 nc localhost 1234 | 
  sed '1,2d' | 
  awk '/--- 1 ---/{f=1;next} f{print}' | 
  grep -E "title=|on_air=" | 
  sed 's/=/":"/g; s/^/"/g; s/""/"/g' | 
  paste -sd "," | 
  sed 's/^/{/g; s/$/}/g')
  json=$(echo "$json" | sed 's/"on_air":"/"startTime":"/g')
  echo "$json"
  echo "$json" > /home/hapa/public_html/lit.lightningthrashes.com/public/current-episode.json
  sleep 1
done
