## Portfolio Site
[Instructions for enabling HTTPS on Amazon Linux [1]](httpsREADME.md)

[caseyasher.info](http://caseyasher.info)'s foundation is an AWS EC2 running an Apache web server and Tomcat 8. The domain hosting is handled through Amazon's Route 53.

This project increased my familiarity with:
* ssh and bash.
* the separation of Apache and Tomcat servers and their respective configs.
* Custom error pages (go ahead, try [this](http://caseyasher.info/aplkdfjalkej) or [this](http://caseyasher.info/apps/zls.f;dslkjlkje) or make up your own garbage url following caseyasher.info/ !).
* Masking Tomcat's port number within the URI.
* troubleshooting what's going on in /var/log/tomcat8 for understanding wonky webapp deployments.

Shoutouts to [Carl](https://github.com/ckl2007) and [Rob](https://skilldistillery.com/our-team-2/) for helping get me unstuck during port masking and Catalina logs.
