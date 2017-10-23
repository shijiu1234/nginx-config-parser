module.exports = {
	"upstream node_upstream": {
		"ip_hash": "",
		"server": [
			"192.168.1.3:9000 max_fails=5 fail_timeout=30",
			"192.168.1.2:9000 max_fails=5 fail_timeout=30",
			"192.168.1.4:9000 max_fails=5 fail_timeout=30"
		]
	},
	"server": {
		"listen": [
			"443 ssl",
			"80"
		],
		"server_name": "app.example.com",
		"ssl": "on",
		"ssl_certificate": "/etc/nginx/certificate.crt",
		"ssl_certificate_key": "/etc/nginx/privKey.key",
		"ssl_session_timeout": "5m",
		"ssl_protocols": "SSLv2 SSLv3 TLSv1",
		"ssl_ciphers": "ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP",
		"ssl_prefer_server_ciphers": "on",
		"if ($ssl_protocol = \"\")": {
			"rewrite": "^ https://$host$request_uri? permanent"
		},
		"location /": {
			"proxy_pass": "http://node_upstream"
		},
		"location /sockjs": {
			"proxy_set_header": [
				"Upgrade $http_upgrade",
				"Connection \"upgrade\"",
				"X-Forwarded-For $proxy_add_x_forwarded_for",
				"Host $host"
			],
			"proxy_http_version": "1.1",
			"proxy_pass": "http://node_upstream"
		}
	}
}
 
