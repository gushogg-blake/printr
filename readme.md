# printr

Print debugging service for awkward environments.

For example:

- PHP API (easier than getting to Apache logs, or you might not have access)

- Bundled Python exe on Windows (stdout may not appear in terminal)

- Phone, without USB debugging

- Cloud, without access to logs

Requires the ability to make HTTP requests.

This is the frontend, a web page that lets you view the logs. For the service that accepts logs and relays them to the frontend, see [printr-relay](//github.com/gushogg-blake/printr-relay).
