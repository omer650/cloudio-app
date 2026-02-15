Cloudio
ArgoCD Login Details
UI URL: https://34.247.141.77:30082
Username: admin
Initial Password: kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" --insecure-skip-tls-verify | base64 -d; echo
