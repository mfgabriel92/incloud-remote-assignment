<?php

namespace App\DataFixtures;

use App\Entity\Task;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class TaskFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        for ($i = 0; $i < 20; $i++) {
            $task = new Task();
            $task->setDescription("Lorem ipsum dolor sit amet #{$i}");
            $task->setDuration("00:10:59");
            $task->setConcludedAt(\DateTime::createFromFormat("Y-m-d H:i:s", date("Y-m-d H:i:s")));
            $task->setCreatedAt(\DateTime::createFromFormat("Y-m-d H:i:s", date("Y-m-d H:i:s")));

            $manager->persist($task);
        }

        $manager->flush();
    }
}
