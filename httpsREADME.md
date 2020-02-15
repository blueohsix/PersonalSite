### HTTPS for Amazon Linux [1] EC2 via Certbot
Pre-requisite: purchased domain name via [Amazon Route 53](https://aws.amazon.com/route53/), text editor (I'll be using [Atom](https://atom.io/)).

This guide covers EC2 creation, assigning an elastic IP address to it, attaching that IP address to your domain name, modifying your .bash_profile for easy access to the instance, installing the Apache HTTP 2.4 (httpd24) server, installing Let's Encrypt's certbot for generation of free SSL certificates, and enabling http redirects to https.

Https does not affect your development process, https instantly makes your site more professional, it increases your potential traffic due to visitors not being presented with warnings from their browsers or antivirus software about the site being insecure, plus some search engines won't even display sites that are non-https!

#### Create new EC2 Instance
1) Log into the AWS Management console and search for 'EC2'.
2) Big blue button, 'Launch Instance'.
3) Select 'Amazon Linux AMI 2018.03.0 (HVM), SSD Volume Type'.
4) Go to step 6, 'Configure Security Group'.
5) Add two rules: one for HTTP and one for HTTPS. You can edit your security group's rules at any time.
6) Big blue buttons, 'Review and Launch', 'Launch'.
7) If this is not your first time launching an instance, you can use an old keypair. First time launches in different regions will require a new keypair.
If you're creating a new keypair, name it something memorable and save it in a safe place.
You can secure your keypair by creating a .ssh folder in your home directory and moving the .pem file into it. We will reference this file later for SSHing into our instance.

Via terminal:
```
mkdir ~/.ssh/
mv ~/Downloads/KeypairName.pem  ~/.ssh/KeypairName.pem
chmod 400 ~/.ssh/KeypairName.pem
```
8) Launch the instance.

#### Assigning Elastic IP address
1) On the left side of the page, scroll down to 'Network and Security' --> 'Elastic IPs'
2) Big orange button, 'Allocate Elastic IP Address'.
3) Big orange button, 'Allocate'.
4) Green banner at the top, 'Associate this Elastic IP Address'.
5) Click inside the search box below 'Instance' and select the instance.
6) Big orange button, 'Associate'.
7) Copy that Elastic IP Address and paste it somewhere you can easily access it later. At this time, that IP address is the public address for your website. Pasting it into the address bar won't do anything yet because we still need to add the Apache HTTP server.

#### Modify .bash_profile for easy SSH access
1) Terminal:
```
cd
atom .bash_profile
```
2) add these two lines (replacing YourElasticIpAddressHere, WhateverYouWantToTypeEveryTime, and KeypairName with your specifics):
```
export EC2USER=ec2-user@YourElasticIpAddressHere
alias WhateverYouWantToTypeEveryTime="ssh -i ~/.ssh/KeypairName.pem $EC2USER"
```

fun fact: 'EC2USER' and 'ec2-user' will be switched to 'ubuntu' for Ubuntu EC2 instances.

3) Save the file. Close Atom. Restart Terminal so that it will recognize the new alias we just created.

#### Install Apache HTTP 2.4 (httpd24) on your instance
1) Open Terminal and type the alias you created in Step 2 of the previous section.
2) type 'yes' to add the ip address to your known hosts. If you messed up somewhere: cd into your .ssh folder, open the known_hosts file, delete the line with that ip address. Restart terminal and try again. Your .pem filename must match the keypair name in AWS. AWS EC2 --> Network and Security --> Key Pairs.
3) sudo yum update
4) Watch the magic happen and wait. It will hang at transaction 9/9 and that is okay. Keep waiting.
5) sudo yum -y install httpd24
6) sudo chkconfig httpd on
7) sudo service httpd start

(httpd also responds to 'stop' and 'restart')

At this point, you can paste your EC2's IP address into your browser's address bar and see the results of your efforts! If all is well, you'll see the 'Amazon Linux AMI Test Page'.

#### Associating your Route 53 Domain name with your EC2
1) AWS Management Console --> [Route 53](https://console.aws.amazon.com/route53/home?#)
2) Open the hosted zone for your domain name.
3) Big blue button, 'Create Record Set'.
4) Optional: add a prefix to your domain name. The default is blank and this is where you would type 'www' or whatever you want to preface your site's name.
(Insight: If you add a prefix, you must use it later when we create our ssl certificate. For example, if your purchased domain name is 'firstnamelastname.dev' and you prefaced it with 'www', you would need to create a certificate for 'www.firstnamelastname.dev'. Creating a certificate for 'firstnamelastname.dev' for the record set 'www.firstnamelastname.dev' leads to a certificate mismatch and will scare traffic away. This can be addressed by creating a wildcard certificate with an asterisk prefix, but you're going to need to adjust your [virtual hosts](https://httpd.apache.org/docs/2.4/vhosts/name-based.html). You'll also need to adjust your virtual hosts if you're adding more than one certificate).
5) Paste your ip address into the Value box. Create. Wait a few minutes for AWS to update itself.
6) At this point, you should be able to navigate to your domain name and see the Amazon Linux AMI Test Page. If you're having problems, clear your browser's cache.

#### Generating our SSL certificate for HTTPS
Due to Certbot not officially supporting Amazon Linux [1] this is might be a bumpy ride, but we'll get through it!

1) Open terminal and SSH into your instance (if not already).
2) sudo yum install -y mod24_ssl
3) wget https://dl.eff.org/certbot-auto
4) chmod a+x certbot-auto
5) sudo ./certbot-auto --debug
6) enter your email address and follow the prompts. IMPORTANT: when entering your domain name(s), you must enter the domain name AND the prefix if you added one. See 'Insight' below Step 4 in the previous section. If you didn't add a prefix, enter your just your domain name.
The setup might fail and that is okay! Keep going.
8) ./certbot-auto certonly --debug
9) 3
10) enter your domain name
11) /var/www/html
12) ./certbot-auto --debug
13) enter your domain name again
14) 1
15) 1
16) Choose whether or not to have all http requests redirected to https. Redirecting will bounce requests from http://firstnamelastname.dev to https://firstnamelastname.dev .
17) Go to your browser and refresh your page. If all is well, your site URL has that lovely padlock next to it! Good job, champ.
If you're running into issues, make sure your record set and certificate match. Example: 'www.meh.com' matching 'www.meh.com' or 'meh.com' matching 'meh.com'). If you messed up, no problem. Cleanup the letsencrypt and httpd/conf.d inside of /etc and re-run the tool or adjust your record set to match the certificate.

#### If you botched things and want to start over
1) cd /etc/letsencrypt
2) sudo rm -rf archive csr keys live renewal
3) sudo mkdir archive csr keys live renewal

If you enabled redirect:
1) cd
2) cd /etc/httpd/conf.d
3) delete the redirect ('le-redirect...') file
4) re-run the certbot tool. Good luck!

#### If you really messed up
1) delete the record set in your hosted zone
2) release the Elastic IP address or disassociate it
3) terminate the instance
4) start at the top.

Additional resources:
https://blog.lawrencemcdaniel.com/letsencrypt-amazon-linux-apache/
https://letsencrypt.org/about/
https://certbot.eff.org/lets-encrypt/pip-apache
https://httpd.apache.org/docs/2.4/vhosts/name-based.html
