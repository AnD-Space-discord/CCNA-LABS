export const labs = [
    {
        id: 'vlan-configuration',
        title: 'VLAN Configuration',
        difficulty: 'Beginner',
        duration: '2 hours',
        description: 'Master broadcast domains and security with hands-on VLAN configuration.',
        category: 'Switching',
        topology: '/Images/VLAN/vlan.jpg',
        legacyFile: 'trunk.lab.html',
        objectives: [
            'Understand VLAN concepts',
            'Create VLANs on Cisco switches',
            'Assign interfaces to specific VLANs',
            'Verify VLAN database'
        ],
        tasks: [
            {
                title: 'SW1 Configuration',
                description: 'Configure hostnames and create VLANs for different departments.',
                scriptPath: '/Scripts/Vlan/SW1.txt'
            }
        ],
        references: [
            {
                title: 'VLAN Ranges',
                items: [
                    { label: 'Normal Range VLANs (2–1001)', value: 'Common VLANs used for general segmentation. Can be created, edited, and deleted.', color: 'text-blue-400' },
                    { label: 'VLANs 1002–1005', value: 'Reserved for legacy protocols like FDDI and Token Ring.', color: 'text-yellow-400' },
                    { label: 'Valid VLAN ID Range', value: '1–4094', color: 'text-green-400' }
                ]
            }
        ]
    },
    {
        id: 'trunking-config',
        title: 'Trunking Configuration',
        difficulty: 'Intermediate',
        duration: '3 hours',
        description: 'Configure 802.1Q trunks between switches.',
        category: 'Switching',
        topology: '/Images/Trunk/trunk-topology.jpg',
        legacyFile: 'trunk.lab.html',
        objectives: ['802.1Q Encapsulation', 'Native VLANs'],
        tasks: [
            { title: 'SW1 Trunk Config', scriptPath: '/Scripts/Trunk/SW1.txt' },
            { title: 'SW2 Trunk Config', scriptPath: '/Scripts/Trunk/SW2.txt' }
        ]
    },
    {
        id: 'ospf-routing',
        title: 'OSPF Single Area',
        difficulty: 'Advanced',
        duration: '4 hours',
        description: 'Dynamic routing with Open Shortest Path First.',
        category: 'Routing',
        topology: 'https://images.pexels.com/photos/2881232/pexels-photo-2881232.jpeg?auto=compress&cs=tinysrgb&w=800',
        legacyFile: 'ospf.lab.html',
        objectives: ['OSPF Process', 'Neighbor Adjacencies'],
        tasks: [
            { title: 'R1 OSPF Config', scriptPath: '/Scripts/OSPF/R1.txt' },
            { title: 'R2 OSPF Config', scriptPath: '/Scripts/OSPF/R2.txt' },
            { title: 'R3 OSPF Config', scriptPath: '/Scripts/OSPF/R3.txt' }
        ]
    },
    {
        id: 'acl-lab',
        title: 'Access Control Lists',
        difficulty: 'Intermediate',
        duration: '2.5 hours',
        description: 'Filter traffic and secure your network using Standard and Extended ACLs.',
        category: 'Security',
        topology: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800',
        legacyFile: 'acl.lab.html',
        objectives: ['Standard ACLs', 'Extended ACLs', 'Traffic Filtering'],
        tasks: [
            { title: 'R1 ACL Config', scriptPath: '/Scripts/ACL/R1.txt' },
            { title: 'SW1 Management Config', scriptPath: '/Scripts/ACL/SW1.txt' }
        ]
    },
    {
        id: 'rip-routing',
        title: 'RIP v2 Routing',
        difficulty: 'Beginner',
        duration: '1 hour',
        description: 'Configure Routing Information Protocol version 2.',
        category: 'Routing',
        topology: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=800',
        legacyFile: 'rip.lab.html',
        objectives: ['RIP Process', 'Network Advertising'],
        tasks: [
            { title: 'R1 RIP Config', scriptPath: '/Scripts/RIP/R1.txt' },
            { title: 'R2 RIP Config', scriptPath: '/Scripts/RIP/R2.txt' }
        ]
    },
    {
        id: 'static-routing',
        title: 'Static Routing',
        difficulty: 'Beginner',
        duration: '1.5 hours',
        description: 'Learn the fundamentals of manual route configuration.',
        category: 'Routing',
        topology: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800',
        legacyFile: 'static-routing.lab.html',
        objectives: ['Default Routes', 'Specific Routes'],
        tasks: [
            { title: 'R1 Static Routes', scriptPath: '/Scripts/StaticRouting/R1.txt' },
            { title: 'R2 Static Routes', scriptPath: '/Scripts/StaticRouting/R2.txt' }
        ]
    },
    {
        id: 'intervlan-routing',
        title: 'Inter-VLAN Routing',
        difficulty: 'Intermediate',
        duration: '2 hours',
        description: 'Route traffic between different segmentations using Router-on-a-Stick.',
        category: 'Switching',
        topology: '/Images/VLAN/vlan.jpg',
        legacyFile: 'intervlan.lab.html',
        objectives: ['Sub-interfaces', 'Encapsulation dot1Q'],
        tasks: [
            { title: 'Router Config', scriptPath: '/Scripts/InterVLAN/R1.txt' },
            { title: 'Switch Config', scriptPath: '/Scripts/InterVLAN/SW1.txt' }
        ]
    },
    {
        id: 'port-security',
        title: 'Switch Port Security',
        difficulty: 'Intermediate',
        duration: '1.5 hours',
        description: 'Prevent unauthorized access at the access layer.',
        category: 'Security',
        topology: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=800',
        legacyFile: 'port-security.lab.html',
        objectives: ['Sticky MAC Addresses', 'Violation Modes'],
        tasks: [
            { title: 'SW1 Port Security', scriptPath: '/Scripts/PortSecurity/SW1.txt' }
        ]
    },
    {
        id: 'ssh-rsa-config',
        title: 'SSH & RSA Configuration',
        difficulty: 'Beginner',
        duration: '1 hour',
        description: 'Secure remote management using encrypted SSH.',
        category: 'Security',
        topology: 'https://images.pexels.com/photos/5935794/pexels-photo-5935794.jpeg?auto=compress&cs=tinysrgb&w=800',
        legacyFile: 'rsa.ssh.lab.html',
        objectives: ['VTY Lines', 'Crypto Keys'],
        tasks: [
            { title: 'SSH Setup', scriptPath: '/Scripts/RSA/R1.txt' }
        ]
    },
    {
        id: 'nat-configuration',
        title: 'Network Address Translation',
        difficulty: 'Intermediate',
        duration: '2 hours',
        description: 'Configure PAT and Static NAT for internet access.',
        category: 'IP Services',
        topology: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
        legacyFile: 'nat.lab.html',
        objectives: ['Inside/Outside NAT', 'Overloading'],
        tasks: [
            { title: 'NAT Router Config', scriptPath: '/Scripts/NAT/R1.txt' }
        ]
    },
    {
        id: 'ipv6-routing',
        title: 'IPv6 Networking',
        difficulty: 'Advanced',
        duration: '3 hours',
        description: 'Implementing the next generation of IP addressing.',
        category: 'IP Services',
        topology: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
        legacyFile: 'ipv6.lab.html',
        objectives: ['SLAAC', 'IPv6 Static Routing'],
        tasks: [
            { title: 'R1 IPv6 Config', scriptPath: '/Scripts/IPv6/R1.txt' },
            { title: 'R2 IPv6 Config', scriptPath: '/Scripts/IPv6/R2.txt' }
        ]
    },
    {
        id: 'basic-cli',
        title: 'Basic CLI Navigation',
        difficulty: 'Beginner',
        duration: '1 hour',
        description: 'Learn to navigate the IOS command line like a pro.',
        category: 'IP Services',
        topology: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800',
        legacyFile: 'basic.cli.lab.html',
        objectives: ['User/Privileged Mode', 'Running Config'],
        tasks: [
            { title: 'CLI Essentials', scriptPath: '/Scripts/BasicCLI/R1.txt' }
        ]
    },
    {
        id: 'dhcp-config',
        title: 'DHCP Server & Relay',
        difficulty: 'Intermediate',
        duration: '2 hours',
        description: 'Configure dynamic host configuration and relay agents for multi-subnet environments.',
        category: 'IP Services',
        topology: '/Images/DHCP/dhcp.png',
        legacyFile: 'dhcp.lab.html',
        objectives: ['DHCP Pools', 'Exclusion Ranges', 'Relay Agents'],
        tasks: [
            { title: 'DHCP Server R1', scriptPath: '/Scripts/DHCP/R1.txt' }
        ]
    },
    {
        id: 'eigrp-routing',
        title: 'EIGRP Implementation',
        difficulty: 'Intermediate',
        duration: '3 hours',
        description: 'Master Cisco\'s Enhanced Interior Gateway Routing Protocol.',
        category: 'Routing',
        topology: '/Images/EIGRP-lab/EIGRP Topology.svg',
        legacyFile: 'eigrp.lab.html',
        objectives: ['DUAL Algorithm', 'Metric Calculation'],
        tasks: [
            { title: 'R1 EIGRP Config', scriptPath: '/Scripts/EIGRP/R1.txt' },
            { title: 'R2 EIGRP Config', scriptPath: '/Scripts/EIGRP/R2.txt' },
            { title: 'R3 EIGRP Config', scriptPath: '/Scripts/EIGRP/R3.txt' }
        ]
    },
    {
        id: 'ospf-multi-area',
        title: 'OSPF Multi-Area',
        difficulty: 'Advanced',
        duration: '4 hours',
        description: 'Complex OSPF deployments with multiple areas and summarization.',
        category: 'Routing',
        topology: 'https://images.pexels.com/photos/2881232/pexels-photo-2881232.jpeg?auto=compress&cs=tinysrgb&w=800',
        legacyFile: 'ospf-multi-area.lab.html',
        objectives: ['ABR Configuration', 'LSA Types'],
        tasks: [
            { title: 'R1 OSPF MultiArea', scriptPath: '/Scripts/OSPFMultiArea/R1.txt' },
            { title: 'R2 OSPF MultiArea', scriptPath: '/Scripts/OSPFMultiArea/R2.txt' },
            { title: 'R3 OSPF MultiArea', scriptPath: '/Scripts/OSPFMultiArea/R3.txt' },
            { title: 'R4 OSPF MultiArea', scriptPath: '/Scripts/OSPFMultiArea/R4.txt' }
        ]
    },
    {
        id: 'accessing-device',
        title: 'Console & VTY Access',
        difficulty: 'Beginner',
        duration: '45 mins',
        description: 'Learn the fundamentals of accessing networking hardware.',
        category: 'IP Services',
        topology: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=800',
        legacyFile: 'accessing-switch-router.lab.html',
        objectives: ['Console Pins', 'Telnet vs SSH'],
        tasks: []
    },
    {
        id: 'routing-basics',
        title: 'Fundamental Routing',
        difficulty: 'Beginner',
        duration: '1.5 hours',
        description: 'Basic routing concepts and interface management.',
        category: 'Routing',
        topology: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=800',
        legacyFile: 'routing.html',
        objectives: ['IP Setup', 'Route Propagation'],
        tasks: []
    },
    {
        id: 'security-basics',
        title: 'Basic Security',
        difficulty: 'Beginner',
        duration: '1 hour',
        description: 'Initial device hardening and password protection.',
        category: 'Security',
        topology: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=800',
        legacyFile: 'security.html',
        objectives: ['Secret Passwords', 'Banner MOTD'],
        tasks: []
    },
    {
        id: 'ip-services-intro',
        title: 'IP Services Hub',
        difficulty: 'Beginner',
        duration: '1.5 hours',
        description: 'Overview of standard IP services used in production.',
        category: 'IP Services',
        topology: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800',
        legacyFile: 'ip-services.html',
        objectives: ['CDP/LLDP', 'NTP Services'],
        tasks: []
    },
    {
        id: 'lab-01-intro',
        title: 'Introduction Lab 01',
        difficulty: 'Beginner',
        duration: '45 mins',
        description: 'First entry into the world of network engineering.',
        category: 'IP Services',
        topology: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=800',
        legacyFile: 'LAB01.lab.html',
        objectives: ['Hardware Identification', 'Basic Prompt'],
        tasks: []
    }
];
