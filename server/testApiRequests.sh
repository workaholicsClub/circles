#!/usr/bin/env bash
uuid=`uuidgen`
echo "USER CREATE"
curl -k -X POST -H "Content-Type: application/json" --data-raw '{"name": "Сергей Сергиенко"}' http://localhost:8082/api/user/create?uuid=${uuid}
echo -e "\nUSER UPDATE"
curl -k -X POST -H "Content-Type: application/json" --data-raw '{"sex": "male", "needSex": "female"}' http://localhost:8082/api/user/update?uuid=${uuid}
echo -e "\nUSER INFO"
curl http://localhost:8082/api/user/info?uuid=${uuid}